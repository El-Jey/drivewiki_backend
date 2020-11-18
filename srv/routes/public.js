const express = require('express');
const router = express.Router();


/* Models */
const cars = require('../models/cars.js');
const motorcycles = require('../models/motorcycles.js');
const common = require('../models/common.js');

/* Routes */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/**
 * Список доступных переводов
 */
router.get('/localization/list', (req, res) => {
  common.availableLanguages()
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
  // return res.status(200).json(req.params.locale);
});

/**
 * Смена локализации
 */
router.get('/localization/:locale', (req, res) => {
  common.getLocalizedStrings(req.params.locale)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
  // return res.status(200).json(req.params.locale);
});

/*
 ** Глобальный поиск по сайту
 */
router.post('/vehicles/search', (req, res) => {
  common.globalSearch(req.body)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
});

/*
 ** Получение типов транспортных средств
 */
router.get('/vehicles/types', (req, res) => {
  common.getVehicleTypes()
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
});

/*
 ** Получение списка автомобилей
 */
router.get('/cars/list', (req, res) => {
  cars.getCarsList((error, response) => {
    if (error) {
      return res.status(200).send(error);
    }
    return res.status(200).json({
      status: true,
      result: response
    });
  });
});

/*
 ** Получение всей информации о модели автомобиля
 */
router.get('/cars/model', (req, res) => {
  cars.getModelInfo(req.query, (error, response) => {
    if (error) {
      return res.status(200).send(error);
    }
    return res.status(200).json({
      status: true,
      result: response
    });
  })
});

/*
 ** Получение списка мотоциклов
 */
router.get('/motorcycles/list', (req, res) => {
  motorcycles.getMotorcyclesList((error, response) => {
    if (error) {
      return res.status(200).send(error);
    }
    return res.status(200).json({
      status: true,
      result: response
    });
  });
});

/*
 ** Получение всей информации о модели мотоцикла
 */
router.get('/motorcycles/model', (req, res) => {
  motorcycles.getModelInfo(req.query, (error, response) => {
    if (error) {
      return res.status(200).send(error);
    }
    return res.status(200).json({
      status: true,
      result: response
    });
  })
});

module.exports = router;