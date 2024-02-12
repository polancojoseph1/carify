const express = require('express');
const getConnection = require('../db/index.js');

getConnection()


async function test() {
  const rows = await process.postgresql.query('SELECT * FROM product WHERE id = 1');
  console.log(rows);
}

test()