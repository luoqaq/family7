const getUser = require('./getUser')
const addUser = require('./addUser')
const updateUser = require('./updateUser')

exports.getUser = getUser.main;
exports.addUser = addUser.main;
exports.updateUser = updateUser.main;