'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _mongodb = require('mongodb');

var _TingoDb = require('../repository/TingoDb');

var _TingoDb2 = _interopRequireDefault(_TingoDb);

var _MongoDb = require('../repository/MongoDb');

var _MongoDb2 = _interopRequireDefault(_MongoDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATABASE_TYPE = process.argv[2];

var setupDatabase = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var mongoConnection;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(DATABASE_TYPE === 'tingo')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', new _TingoDb2.default(_settings2.default.DB_CONFIG.PATH, _settings2.default.DB_CONFIG.OPTIONS));

          case 2:
            if (!(DATABASE_TYPE === 'mongo')) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return _mongodb.MongoClient.connect(_settings2.default.DB_CONFIG.URL);

          case 5:
            mongoConnection = _context.sent;
            return _context.abrupt('return', new _MongoDb2.default(mongoConnection));

          case 7:
            throw new Error('Wrong database type');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setupDatabase() {
    return _ref.apply(this, arguments);
  };
}();

var getFiles = function getFiles(directoryPath) {
  var fileNames = _fs2.default.readdirSync(directoryPath).filter(function (fileName) {
    return fileName.endsWith('.json');
  });

  return fileNames.map(function (fileName) {
    return _fs2.default.readFileSync(directoryPath + '/' + fileName);
  });
};

var parseFile = function parseFile(file) {
  return JSON.parse(file.toString());
};

var mapOwnerID = function mapOwnerID(userIDsMap) {
  return function (item) {
    return (0, _extends3.default)({}, item, { ownerID: userIDsMap.get(item.ownerID) || null
    });
  };
};

var translateDeviceID = function translateDeviceID(item) {
  return (0, _extends3.default)({}, item, { _id: new _mongodb.ObjectId(item.deviceID), id: item.deviceID });
};

// eslint-disable-next-line no-unused-vars
var filterID = function filterID(_ref2) {
  var id = _ref2.id,
      otherProps = (0, _objectWithoutProperties3.default)(_ref2, ['id']);
  return (0, _extends3.default)({}, otherProps);
};

var insertItem = function insertItem(database, collectionName) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(item) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return database.insertOne(collectionName, item);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var insertUsers = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(database, users) {
    var userIDsMap;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userIDsMap = new _map2.default();
            _context4.next = 3;
            return _promise2.default.all(users.map(function () {
              var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(user) {
                var insertedUser;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return database.insertOne('users', filterID(user));

                      case 2:
                        insertedUser = _context3.sent;

                        userIDsMap.set(user.id, insertedUser.id);

                      case 4:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x4) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 3:
            return _context4.abrupt('return', userIDsMap);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function insertUsers(_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
  var database, users, userIDsMap;
  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;

          console.log('Setup database connection...');
          _context5.next = 4;
          return setupDatabase();

        case 4:
          database = _context5.sent;

          console.log('Start migration to ' + DATABASE_TYPE);

          users = getFiles(_settings2.default.USERS_DIRECTORY).map(parseFile);
          _context5.next = 9;
          return insertUsers(database, users);

        case 9:
          userIDsMap = _context5.sent;
          _context5.next = 12;
          return _promise2.default.all(getFiles(_settings2.default.WEBHOOKS_DIRECTORY).map(parseFile).map(mapOwnerID(userIDsMap)).map(filterID).map(insertItem(database, 'webhooks')));

        case 12:
          _context5.next = 14;
          return _promise2.default.all(getFiles(_settings2.default.DEVICE_DIRECTORY).map(parseFile).map(mapOwnerID(userIDsMap)).map(translateDeviceID).map(filterID).map(insertItem(database, 'deviceAttributes')));

        case 14:

          console.log('All files migrated to the database successfully!');
          process.exit(0);
          _context5.next = 22;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5['catch'](0);

          console.log(_context5.t0);
          process.exit(1);

        case 22:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, undefined, [[0, 18]]);
}))();