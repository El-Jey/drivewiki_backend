'use strict';
const mysql = require('../database');

/*
 ** Получение списка брендов и моделей автомобилей
 ** callback params:
 ** error - object,
 ** result - object,
 */
const getCarsList = (callback) => {
  let query = 'SELECT b.`name` AS brand, m.`name` AS model '  +
              'FROM brands b '                                +
              'INNER JOIN models m ON m.vehicle_type = 1 '    +
              'WHERE b.id = m.brand_id '                      +
              'ORDER by b.`name`';

  mysql.execute(query, function (err, results) {
    if (err) {
      return callback(err, null);
    }

    if (!results.length) {
      return callback({
        status: false,
        error: 'empty_data'
      }, null);
    }
    // 1) for loop - 0.055 ms
    // 2) for of loop - 0.078 ms
    // 3) forEach - 0.087 ms
    // 4) array.reduce - 0.124 ms
    // let cars = [];
    // console.time('array reduce');
    // cars = results.reduce((acc, current) => {
    //   let accIndex = acc.findIndex(element => {
    //     return element.brand === current.brand;
    //   });

    //   accIndex !== -1 ?
    //     acc[accIndex].models.push(current.model) :
    //     acc.push(Object.assign({}, {
    //       brand: current.brand,
    //       models: [current.model]
    //     }));
    //   return acc;
    // }, cars);
    // console.timeEnd('array reduce');


    let cars = [];
    let brand;
    let models = [];
    let object = {};

    if (results.length == 1) {
      models.push(results[0].model);
      object.brand = results[0].brand;
      object.models = models;
      cars.push(object);
      return callback(null, cars);
    }

    // console.time('forEach loop');
    // results.forEach((element, i) => {
    //   if (i == 0) {
    //     brand = element.brand;
    //     models.push(element.model);
    //     return;
    //   }

    //   if (element.brand === brand) {
    //     models.push(element.model);
    //   } else {
    //     object.brand = brand;
    //     object.models = models;
    //     cars.push(object);

    //     object = {};
    //     models = [];
    //     brand = element.brand;
    //     models.push(element.model);
    //   }

    //   if (i == results.length - 1) {
    //     object.brand = brand;
    //     object.models = models;
    //     cars.push(object);
    //   }
    // });
    // console.timeEnd('forEach loop');


    // cars = [];
    // brand;
    // models = [];
    // object = {};
    console.time('For loop');
    for (let i = 0, length = results.length; i < length; i++) {
      if (i == 0) {
        brand = results[i].brand;
        models.push(results[i].model);
        continue;
      }

      if (results[i].brand === brand) {
        models.push(results[i].model);
      } else {
        object.brand = brand;
        object.models = models;
        cars.push(object);

        object = {};
        models = [];
        brand = results[i].brand;
        models.push(results[i].model);
      }

      if (i === results.length - 1) {
        object.brand = brand;
        object.models = models;
        cars.push(object);
      }
    }
    console.timeEnd('For loop');



    // cars = [];
    // brand;
    // models = [];
    // object = {};
    // console.time('for of loop');

    // let i = 0;
    // for (let el of results) {
    //   if (i == 0) {
    //     brand = el.brand;
    //     models.push(el.model);
    //     i++;
    //     continue;
    //   }

    //   if (el.brand === brand) {
    //     models.push(el.model);
    //   } else {
    //     object.brand = brand;
    //     object.models = models;
    //     cars.push(object);

    //     object = {};
    //     models = [];
    //     brand = el.brand;
    //     models.push(el.model);
    //   }

    //   if (i == results.length - 1) {
    //     object.brand = brand;
    //     object.models = models;
    //     cars.push(object);
    //   }

    //   i++;
    // }
    // console.timeEnd('for of loop');




    return callback(null, cars);
  });
}

/*
 ** Получение всей информации о модели автомобиля
 ** callback params:
 ** error - object,
 ** result - object,
 */
const getModelInfo = (data, callback) => {
  modelTotalInfo(data, (error, result) => {
    if (error) { // TODO: обработку всех ошибок сделать
      return callback(error, null);
    } else {
      let totalInfo = result;

      modelDetailedInfo(data, (error, result) => {
        if (error) {
          return callback(null, {
            totalInfo
          });
        } else {
          let paragraphs = result;
          let response = {
            totalInfo,
            paragraphs
          }
          return callback(null, response);
        }
      });
    }
  });
}


/*
 ** Получение общих данных о модели автомобиля
 ** callback params:
 ** error - object,
 ** result - object,
 */
const modelTotalInfo = (data, callback) => {
  let query = 'SELECT ti.manufacturer, ti.years, ti.class, ti.main_image, ti.description ' +
    'FROM brands b ' +
    'JOIN models m ON b.id = m.brand_id ' +
    'JOIN model_total_info ti ON ti.model_id = m.id ' +
    'WHERE b.`name` = ? ' +
    'AND m.`name` = ? ' +
    'AND m.vehicle_type = 1';

  mysql.execute(query, [data.brand, data.model], function (err, results) {
    if (err) {
      return callback(err, null);
    }
    if (!results.length) {
      return callback({
        status: false,
        error: 'empty_data'
      }, null);
    } else {
      return callback(null, results[0]);
    }
  });
}

/*
 ** Получение инфы о всех поколениях данной модели автомобиля
 ** callback params:
 ** error - object,
 ** result - object,
 */
const modelDetailedInfo = (data, callback) => {
  let query = 'SELECT di.paragraph_title AS title, di.description ' +
    'FROM brands b ' +
    'JOIN models m ON m.brand_id = b.id ' +
    'JOIN model_detailed_info di ' +
    'ON di.model_id = m.id ' +
    'WHERE b.`name` = ? ' +
    'AND m.`name` = ? ' +
    'AND m.vehicle_type = 1';

  mysql.execute(query, [data.brand, data.model], function (err, results) {
    if (err) {
      return callback(err, null);
    }
    if (!results.length) {
      return callback({
        status: false,
        error: 'empty_data'
      }, null);
    } else {
      return callback(null, results);
    }
  });
}


module.exports = {
  getCarsList,
  getModelInfo
}