async function getAllPaymentAccountsJoinPayment() {
  const query = `
      SELECT pa.*, p.*
      FROM payment_account pa
      LEFT JOIN payment p ON pa.payment_id = p.id;
    `
  const allPaymentAccounts = await process.postgresql.query(query);
  return allPaymentAccounts
}

async function getPaymentAccountById(id) {
  const paymentAccount = await process.postgresql.query(`
    SELECT * FROM payment_account
    WHERE
     id = ${id}
  `);
  return paymentAccount
}

async function addPaymentAccount(newId, name, paymentId, userId) {
  const newPaymentAccount = await process.postgresql.query(`
    INSERT INTO payment_account (
      id,
      name,
      payment_id,
      user_id
    )
    VALUES (
      ${newId},
      '${name}',
      ${paymentId},
      ${userId}
    )
    RETURNING *`);
  return newPaymentAccount
}

async function updatePaymentAccount(id, name) {
  updatedPaymentAccount = await process.postgresql.query(`
    UPDATE payment_account
    SET
      name = '${name}'
    WHERE
      id = ${id}
    RETURNING *
    `);
  return updatedPaymentAccount
}

async function deletePaymentAccount(id) {
  const deletedPaymentAccount = await process.postgresql.query(`
    DELETE FROM payment_account
    WHERE id = ${id}
    RETURNING *
  `);
  return deletedPaymentAccount
}

module.exports = {
  getAllPaymentAccountsJoinPayment,
  getPaymentAccountById,
  addPaymentAccount,
  updatePaymentAccount,
  deletePaymentAccount
}