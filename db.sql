-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.4.12-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.0.0.5958
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных drive_wiki
CREATE DATABASE IF NOT EXISTS `drive_wiki` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `drive_wiki`;

-- Дамп структуры для таблица drive_wiki.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы drive_wiki.brands: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
REPLACE INTO `brands` (`id`, `name`) VALUES
	(2, 'Aston Martin'),
	(1, 'BMW'),
	(3, 'Ducati'),
	(7, 'Kawasaki'),
	(4, 'Mitsubishi'),
	(5, 'Peugeot'),
	(6, 'Suzuki');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;

-- Дамп структуры для таблица drive_wiki.languages
CREATE TABLE IF NOT EXISTS `languages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locale` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `locale` (`locale`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы drive_wiki.languages: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
REPLACE INTO `languages` (`id`, `name`, `locale`, `created_at`, `updated_at`) VALUES
	(1, 'Русский', 'ru', '2020-08-30 17:06:01', NULL),
	(2, 'English', 'en', '2020-08-30 17:06:18', NULL);
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;

-- Дамп структуры для таблица drive_wiki.models
CREATE TABLE IF NOT EXISTS `models` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_id` int(10) unsigned NOT NULL,
  `vehicle_type` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `brand_id` (`brand_id`),
  KEY `vehicle_type` (`vehicle_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы drive_wiki.models: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
REPLACE INTO `models` (`id`, `name`, `brand_id`, `vehicle_type`) VALUES
	(1, 'M3', 1, 1),
	(2, 'DB2/4', 2, 1);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;

-- Дамп структуры для таблица drive_wiki.model_detailed_info
CREATE TABLE IF NOT EXISTS `model_detailed_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `model_id` int(11) unsigned DEFAULT NULL,
  `paragraph_title` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `model_id` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы drive_wiki.model_detailed_info: ~8 rows (приблизительно)
/*!40000 ALTER TABLE `model_detailed_info` DISABLE KEYS */;
REPLACE INTO `model_detailed_info` (`id`, `model_id`, `paragraph_title`, `description`) VALUES
	(1, 2, 'Описание', 'Впервые DB2/4 был представлен публике в 1953 году на автошоу в Лондоне. На автомобиле был установлен двигатель объёмом в 2.6 л (125 л.с.), который ранее использовался на DB2 Vantage. Для компенсации большого веса с 1954 года модели производились с двигателями в 2.9 л (140 л. с.).\r\n\r\nПо сравнению с предыдущими моделями автомобиль был оснащён более крепким бампером, а фары были расположены выше в соответствии с правилами безопасности. На DB2/4 были передний и задний барабанные тормоза, независимая пружинная задняя и зависимая пружинная передняя подвеска.\r\n\r\nПроизводилось два вида автомобиля — четырёхместное купе с кузовом хэтчбека и двухместный кабриолет (всего сделано 102 модели за два года производства). Один из кабриолетов использовал Альфред Хичкок в фильме «Птицы».\r\n\r\nВ 1954 году DB2/4 с двигателем в 2.9 л был тестирован британским журналом The Motor, который представил результаты: максимальная скорость — 190.7 км/ч, разгон до 97 км.ч — 10.5 секунд.'),
	(2, 2, 'Mark II', 'Модификацию DB2/4 Mark II начали производить в 1955 году на заводе Aston Martin Тикфорд в Ньюпорт-Пагнелл. Внешне автомобиль был похож на предыдущую модель, но отличался более мощным двигателем, выдававшим 165 л. с. Хромированная линия, простирающаяся вдоль всего корпуса автомобиля, разделяя кузов на две части, маленькие задние фары были сделаны в стиле Hillman Minx.\r\n\r\nВсего было сделано 199 автомобилей; производились модели с кузовами хэтчбек, купе и кабриолет «ветер-в-волосах». Модель с откидным верхом была оснащена двигателем мощностью в 140 л. с. (специальная серия — 165 л. с.). Mark II с кузовом купе имел более высокую линию крыши, чем другие модели, благодаря чему на задних сидениях было более просторно; всего было сделано 34 модели.'),
	(3, 1, 'E30', '<p>Основанная на модели E30 BMW 3 серии 1986 года, первая представленная модель имела 2,3 L рядный четырёхцилиндровый двигатель S14B23. Дизайн двигателя основывался на предыдущих наработках BMW. Выступала во многих кузовных гоночных сериях, с немалым успехом.</p>\r\n\r\n<p>Первая версия для дорог общего пользования имела 195 л. с. (143 кВт). Модели Evolution имели 2,3 л двигатели, но изменённую выхлопную систему, увеличенное сжатие и небольшие доработки увеличили производительность до 215 л. с. (160 кВт). Позднее модель Sport Evolution получила 2,5 л двигатели, что увеличило мощность до 238 л. с. (175 кВт). Также было выпущено 786 кабриолетов.</p>\r\n\r\n<p>M3 была укомплектована усовершенствованным укреплённым и более аэродинамическим кузовом. BMW M3 отличалась раздутыми крыльями, спойлером и передней «губой» — на стандартные модели аналоги не изготовлялись. Также E30 отличался более пологим наклоном заднего ветрового стекла для улучшения аэродинамических свойств кузова. Переднее ветровое стекло вклеивалось для увеличения жёсткости кузова. Остекление имело меньшую толщину. Помимо этого, автомобиль получил более жёсткую и низкую подвеску со стойками Bilstein B6. M3 длиннее и шире стандартного BMW E30. Также на M3 ставились фирменные диски BBS, на которые натягивалась широкая низкопрофильная резина.</p>'),
	(4, 1, 'E36', '<p>E36 M3 дебютировал в феврале 1992 и попал в салоны дилеров в ноябре этого же года. Это был первый M3 укомплектованный шестицилиндровым двигателем, вытеснивший 2990 cc версию и развивающий 286 л. с./210 кВт. Изначально доступный только как купе BMW M3 позднее появился в модификациях кабриолет и седан в 1994. M3 в 36 — кузове был первой среди М-версий в модификации с «правым рулём».</p>'),
	(5, 1, 'E46', '<p>E46 M3 дебютировал в октябре 2000 года. Новому поколению автомобиля удалось избавиться от 110 кг веса, что вкупе с перенастроенным шасси дало заметную прибавку в управляемости автомобиля. Была выставлена в гоночную серию DTM в 2003-ем году. Была оснащена на тот момент двигателем S54B32 на 343 л. с. при 8700 об./мин., 6-ступенчатой МКПП с двойным узлом сцепления, также трансмиссия была оснащена лёгким гоночным маховиком, тормозная система Brembo с равномерным распределением тормозных усилий, но большая часть усилий шла на переднюю ось, тормозные диски оснащены перфорацией и вентиляцией, тормозные колодки керамические с набором титановых деталей, с высокими задними стойками стабилизаторов, передние стойки стабилизаторов занижены.</p>'),
	(6, 1, 'E90/92/93', '<p>Четвёртое поколение BMW M3 было анонсировано в 2007 году на женевском автосалоне (Швейцария, 6-18 марта 2007) с показом концепт-кара BMW M3. Как и в случае с концептами E46 M3 и E60 M5, концепт M3 был практически серийной моделью, премьера которой состоялась в этом же 2007 году на франкфуртском автошоу (Германия, 13-23 сентября). Баварская компания выпустила облегчённую версию M3 GTS, машину освободили от всего «ненужного», а именно, от мультимедийного комплекса, климат-контроля, сложной, тяжёлой шумоизоляции, задних сидений и даже кондиционера; цвет авто — только ярко оранжевый. Цена облегчённой версии составила 145 000 долларов США. Все автомобили моментально раскупили.</p>\r\n\r\n<p>Впервые М3 стал оснащаться двигателем V8. Сделанный на базе десятицилиндрового агрегата от M5 мотор имеет объём 4 л. и развивает 420л. с. при 8300 об./мин. Технически он не сильно отличается от рядного шестицилиндрового двигателя предыдущей модели: здесь так же применены индивидуальные дроссельные заслонки и система изменения фаз впускных и выпускных клапанов. Однако блок цилиндров уже отлит из сплава алюминия, а не чугуна. На M3 четвёртого поколения помимо ручной шестискоростной коробки передач устанавливается так же 7-скоростная роботизированная коробка с двумя сцеплениями DCT, сокращающая время разгона до 100км/ч на 0,2 с 4.8 с. — до 4,6 с.</p>'),
	(7, 1, 'M3 E90 CRT', 'CRT (Carbon Racing Technology), был анонсирован в июне 2011 года. Комплектовался тем же двигателем, что и GTS, но при этом сохранил в себе шумоизоляцию, мультимедиа, навигацию и прочие прелести. Всего было выпущено 67 машин, номер каждой машины обозначен на приборной панели. Разгон до сотни 4,4 с.'),
	(8, 1, 'F80', 'Новое поколение M3 было показано на Североамериканском автосалоне 2014 года. Продажи в Европе начались в марте 2014 года, в России — летом 2014 года. F80 M3 будет продаваться только в кузове седан, а кузов купе и кабриолет были выделены в отдельный модельный ряд BMW M4. В 2015 году представлена рестайлинговая версия БМВ М3 в кузове F80.\r\n\r\nF80 M3 производится с 2014 года, исключительно на заводе BMW-Werk Regensburg.\r\n\r\nВ феврале 2018 года BMW объявил, что M3 F80 больше не будет продаваться в Европе с августа 2018 года. Причина этого в том, вредных частиц Евро-6, что двигатель транспортного средства не может соответствовать руководящим принципам стандарта Euro 6d, который становится обязательным 1 сентября 2018 года без фильтра частиц Otto (OPF). С другой стороны, M4 получает фильтр частиц и, следовательно, будет продолжать выпускаться для Европы после 2018 года. В США прекратили производство в мае 2018 года из-за введения в правил выбросов с 1 июня 2018 года, Германия продолжит производство.\r\n\r\nС 2018 года производится новая версия под названием BMW M3 CS Она имеет облегченные элементы кузова такие как; крышка капота, сделанная из углеволоконного композита (Карбон), имеющая вес всего в 1,5 килограмма, крылья, некоторые элементы интерьера а также новая, облегченная на 12 кг роботизированная коробка передач в сумме уменьшили вес автомобиля на 60 кг.');
/*!40000 ALTER TABLE `model_detailed_info` ENABLE KEYS */;

-- Дамп структуры для таблица drive_wiki.model_total_info
CREATE TABLE IF NOT EXISTS `model_total_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `model_id` int(11) DEFAULT NULL,
  `manufacturer` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `years` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `model_id` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы drive_wiki.model_total_info: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `model_total_info` DISABLE KEYS */;
REPLACE INTO `model_total_info` (`id`, `model_id`, `manufacturer`, `years`, `class`, `main_image`, `description`) VALUES
	(1, 2, '	Aston Martin', '1953—1957', '	спорткар', 'Aston_Martin_DB2-4_Mark_I.jpg', '<b>Martin DB2/4</b> — гран туризмо марки Aston Martin, выпускавшийся в 1953—1957 годах. Автомобиль основан на предыдущей модели фирмы — Aston Martin DB2. DB2/4 — один из первых хетчбеков в истории. Также производился двухместный вариант с откидным верхом. В 1955 году была выпущена модификация автомобиля Mark II с кузовами купе и кабриолет.'),
	(2, 1, 'BMW M', '1986 — настоящее время', 'Спортивный седан, купе', 'bmw_m3_gtr.jpg', '<b>BMW M3</b> — высокотехнологичная спортивная версия компактных автомобилей BMW 3 серии от BMW M GmbH. Модели M3 сделаны на базе E30, E36, E46, E90/E92/E93 и F30 3-ей серии. Основные отличия от «стандартных» автомобилей 3 серии включают более мощный двигатель, улучшенную подвеску, более агрессивный и аэродинамичный обвес, множественные акценты как в интерьере так и в экстерьере на принадлежность к линейке «M»/Motorsport.');
/*!40000 ALTER TABLE `model_total_info` ENABLE KEYS */;

-- Дамп структуры для таблица drive_wiki.vehicle_types
CREATE TABLE IF NOT EXISTS `vehicle_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `translate_key` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `route` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `route` (`route`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы drive_wiki.vehicle_types: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `vehicle_types` DISABLE KEYS */;
REPLACE INTO `vehicle_types` (`id`, `name`, `translate_key`, `route`, `created_at`, `updated_at`) VALUES
	(1, 'Автомобили', 'cars', '/cars', '2020-08-30 17:06:40', '2020-09-13 19:24:10'),
	(2, 'Мотоциклы', 'motorcycles', '/motorcycles', '2020-08-30 17:07:15', '2020-09-13 19:24:11');
/*!40000 ALTER TABLE `vehicle_types` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
