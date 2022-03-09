const addGift = require('./addGift');
const getGifts = require('./getGifts')
const deleteGift = require('./deleteGift');
const completeGift = require('./completeGift');
const updateGift = require('./updateGift');

exports.addGift = addGift.main;
exports.getGifts = getGifts.main;
exports.deleteGift = deleteGift.main;
exports.updateGift = updateGift.main;
exports.completeGift = completeGift.main;
