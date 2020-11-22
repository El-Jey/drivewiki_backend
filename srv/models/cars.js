'use strict';
const mysql = require('../database');

/*
 ** Получение списка брендов и моделей автомобилей
 ** callback params:
 ** error - object,
 ** result - object,
 */
const getCarsList = (callback) => {
  let query = 'SELECT b.`name` AS brand, m.`name` AS model ' +
    'FROM brands b ' +
    'INNER JOIN models m ON m.vehicle_type = 1 ' +
    'WHERE b.id = m.brand_id ' +
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
    } else {
      // Slower algorythm
      // let cars = [];
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

      // Faster algorythm
      let cars = [],
        brand,
        models = [],
        object = {};

      for (var i = 0; i < results.length; i++) {
        if (results.length == 1) {
          models.push(results[i].model);
          object.brand = results[i].brand;
          object.models = models;
          cars.push(object);
          break;
        }

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
          models = [],
            brand = results[i].brand;
          models.push(results[i].model);
        }

        if (i == results.length - 1) {
          object.brand = brand;
          object.models = models;
          cars.push(object);
        }
      }

      return callback(null, cars);
    }
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