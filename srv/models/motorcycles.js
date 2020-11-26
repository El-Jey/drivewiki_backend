'use strict';
const mysql = require('../database');

/*
 ** Получение списка брендов и моделей автомобилей
 ** callback params:
 ** error - object,
 ** result - object,
 */
const getMotorcyclesList = (callback) => {
  let query = 'SELECT b.`name` AS brand, m.`name` AS model '    +
              'FROM brands b '                                  +
              'INNER JOIN models m ON m.vehicle_type = 2 '      +
              'WHERE b.id = m.brand_id '                        +
              'ORDER by b.`name`';
              
  mysql.execute(query, function(err, results) {
    if (err) {
      return callback(err, null);
    }
    if (!results.length) {
      return callback({ status: false, error: 'empty_data' }, null);
    }
      let motorcycles = [],
        brand,
        models = [],
        object = {};

        if (results.length == 1) {
          models.push(results[0].model);
          object.brand = results[0].brand;
          object.models = models;
          motorcycles.push(object);
          return callback(null, motorcycles);
        }

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
          motorcycles.push(object);

          object = {};
          models = [];
          brand = results[i].brand;
          models.push(results[i].model);
        }

        if (i === results.length - 1) {
          object.brand = brand;
          object.models = models;
          motorcycles.push(object);
        }
      }
      return callback(null, motorcycles);
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
        if (error) { // TODO: обработку всех ошибок сделать
          return callback(error, null);
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
  let query = 'SELECT ti.manufacturer, ti.years, ti.class, ti.main_image, ti.description '    +
              'FROM brands b '                                                                +
              'JOIN models m ON b.id = m.brand_id '                                           +
              'JOIN model_total_info ti ON ti.model_id = m.id '                               +
              'WHERE b.`name` = ? '                                                           +
              'AND m.`name` = ? '                                                             +
              'AND m.vehicle_type = 2';

  mysql.execute(query, [data.brand, data.model], function(err, results) {
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
  let query = 'SELECT di.paragraph_title AS title, di.description '                 +
              'FROM brands b '                                                      +
              'JOIN models m ON b.id = m.brand_id '                                 +
              'JOIN model_detailed_info di '                                        +
              'ON di.model_id = m.id '                                              +
              'WHERE b.`name` = ? '                                                 +
              'AND m.`name` = ? '                                                   +
              'AND m.vehicle_type = 2';

  mysql.execute(query, [data.brand, data.model], function(err, results) {
    if (err) {
      return callback(err, null);
    }
    if (!results.length) {
      return callback({ status: false, error: 'empty_data' }, null);
    } else {
      return callback(null, results);
    }
  });
}


module.exports = {
  getMotorcyclesList,
  getModelInfo
}
