const { v4: uuidv4 } = require('uuid');

function generateRandomId() {
  return Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
}

function generateUuid() {
  return uuidv4();
}
module.exports = {generateRandomId, generateUuid}