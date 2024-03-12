async function getCartByUserId(userId) {
  const query = `
  SELECT * FROM cart
  WHERE
    user_id = ${userId} AND
    status = 'active'
  `
  let cart = await process.postgresql.query(query)
  return cart
}

async function getCartByCartId(cartId) {
  const query = `
  SELECT * FROM cart
  WHERE
    id = ${cartId} AND
    status = 'active'
  `
  let cart = await process.postgresql.query(query)
  return cart
}

async function addCart(newId, userId, paymentAccountId, status) {
  const query = `
    INSERT INTO cart (
      id,
      status,
      time,
      user_id
      ${paymentAccountId ? ", " + "payment_account_id" : ''}
    )
    VALUES (
      ${newId},
      '${status}',
      CURRENT_TIMESTAMP,
      ${userId}
      ${paymentAccountId ? ", " + paymentAccountId : ''}
    )
    RETURNING *;`;
  
  cart = await process.postgresql.query(query);
  return cart;
}

async function updateCart(cartId, status, paymentAccountId) {
  const query = `
  UPDATE cart
  SET
    status = '${status}',
    time = CURRENT_TIMESTAMP,
    payment_account_id = COALESCE(${paymentAccountId}, payment_account_id)
  WHERE id = ${cartId}
  RETURNING *
  `
  const updatedCart = await process.postgresql.query(query);
  return updatedCart
}

async function updateCartUserId(cartId, userId) {
  const query = `
  UPDATE cart
  SET
    user_id = ${userId}
  WHERE id = ${cartId}
  RETURNING *
  `
  const updatedCart = await process.postgresql.query(query);
  return updatedCart
}

module.exports = {
  getCartByUserId,
  getCartByCartId,
  addCart,
  updateCart,
  updateCartUserId
}