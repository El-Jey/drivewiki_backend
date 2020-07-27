'use strict';
const mysql = require('../database');
const fs = require('fs');

const getVehicleTypes = () => {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT * FROM vehicle_types';

    mysql.promise().execute(query)
      .then(([results]) => {
        // if (!results.length) {
        //   return resolve({
        //     status: false,
        //     result: 'empty_data'
        //   });
        // }

        console.log(results);

        return resolve({
          status: true,
          result: results
        });
      })
      .catch((err) => {
        return reject({
          status: false,
          error: err
        });
      });
  });
}

const availableLanguages = () => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM languages';

    mysql.promise().execute(query)
      .then(([results]) => {
        if (!results.length) {
          return resolve({
            status: false,
            result: 'empty_data'
          });
        }

        return resolve({
          status: true,
          result: results
        });
      })
      .catch((err) => {
        return reject({
          status: false,
          error: err
        });
      });
  })
}

const getLocalizedStrings = (locale) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + `/../localization/strings/${locale}.json`, 'utf-8', (err, file) => {
      if (err) {
        return reject(err);
      }

      return resolve({
        status: true,
        result: file
      });
    })
  });
}

const globalSearch = (search) => {
  return new Promise(function (resolve, reject) {
    let statement = '%' + search + '%';
    let query = 'SELECT b.`name` AS brand, m.`name` AS model, m.vehicle_type AS type ' +
      'FROM brands b ' +
      'INNER JOIN models m ON b.id = m.brand_id ' +
      'WHERE b.`name` LIKE ? ' +
      'ORDER by b.`name`';

    mysql.promise().execute(query, [statement])
      .then(([results]) => {
        if (!results.length) {
          return resolve({
            status: false,
            result: 'empty_data'
          });
        }

        let cars = sortVehiclesByManufacturer(filterByVehicleType(results, 1));
        let motorcycles = sortVehiclesByManufacturer(filterByVehicleType(results, 2));

        return resolve({
          status: true,
          result: {
            cars,
            motorcycles
          }
        });
      })
      .catch((err) => {
        return reject({
          status: false,
          error: err
        });
      });
  });
}

/**
 * @private filtering results by vehicle type
 */
const filterByVehicleType = (resultsArray, type) => {
  return resultsArray.filter((item) => {
    return item.type == type;
  })
}

/**
 * @private sorting results by manufacturer
 */
const sortVehiclesByManufacturer = (filteredArray) => {
  let data = [],
    brand,
    models = [],
    object = {};

  for (let i = 0; i < filteredArray.length; i++) {
    if (filteredArray.length == 1) {
      models.push(filteredArray[i].model);
      object.brand = filteredArray[i].brand;
      object.models = models;
      data.push(object);
      break;
    }

    if (i == 0) {
      brand = filteredArray[i].brand;
      models.push(filteredArray[i].model);
      continue;
    }

    if (filteredArray[i].brand === brand) {
      models.push(filteredArray[i].model);
    } else {
      object.brand = brand;
      object.models = models;
      data.push(object);

      object = {};
      models = [],
        brand = filteredArray[i].brand;
      models.push(filteredArray[i].model);
    }

    if (i == filteredArray.length - 1) {
      object.brand = brand;
      object.models = models;
      data.push(object);
    }
  }
  return data;
}


module.exports = {
  availableLanguages,
  getLocalizedStrings,
  globalSearch,
  getVehicleTypes
}