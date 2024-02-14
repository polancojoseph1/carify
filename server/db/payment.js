async function getAllPayments() {
  const payments = await process.postgresql.query('SELECT * FROM payment')
  return payments
}

async function getPaymentById(id) {
  const query = `SELECT * FROM payment WHERE id = ${id} LIMIT 1`;
  const payment = await process.postgresql.query(query);
  return payment;
}

async function addPayment(newId, type) {
  const query = `INSERT INTO payment (
    id,
    type
  )
  VALUES (
    ${newId},
    '${type}'
  )
  RETURNING *;`;
  const newPayment = await process.postgresql.query(query);
  return newPayment
}

async function updatePayment(id, type) {
  const query = `
    UPDATE payment
    SET type = '${type}' 
    WHERE id = ${id}
    RETURNING *
    `
  const updatedPayment = await process.postgresql.query(query);
  return updatedPayment
}

async function deletePayment(id) {
  const query = `
    DELETE FROM payment
    WHERE
      id = ${id} 
    RETURNING *;`
  const deletedPayment = await process.postgresql.query(query);
  return deletedPayment
}

module.exports = {
  getAllPayments,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment
}