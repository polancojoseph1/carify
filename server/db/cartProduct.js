async function getAllCartProducts() {
  const cartProducts = await process.postgresql.query(`SELECT * FROM cart_product`);
  return cartProducts
}

async function getCartProductByCartId(cartId) {
  const cartProduct = await process.postgresql.query(`
    SELECT * FROM cart_product
    WHERE
      cart_id = ${cartId}
    LIMIT 1
  `);
  return cartProduct
}

async function addCartProduct(newId, cartId, productId, quantity, totalPrice) {
  const cartProduct = await process.postgresql.query(`
    INSERT INTO cart_product (
      id,
      cart_id,
      product_id,
      quantity,
      totalPrice
    )
    VALUES (
      ${newId},
      ${cartId},
      ${productId},
      ${quantity},
      ${totalPrice}
    )
    RETURNING *
    `);
  return cartProduct
}

async function updateCartProduct(cartId, productId, addedQuantity, addedPrice) {
  const cartProduct = await process.postgresql.query(`
    UPDATE cart_product 
    SET
      quantity = quantity + ${addedQuantity},
      totalPrice = totalPrice + ${addedPrice}
    WHERE
      cart_id = ${cartId} AND
      product_id = ${productId}
    RETURNING *
    `);
  return updatedCartProduct
}

async function deleteCartProduct(cartId, productId) {
  const deletedCartProduct = await process.postgresql.query(`
    DELETE FROM cart_product
    WHERE
      cart_id = ${cartId} AND
      product_id = ${productId}
    RETURNING *
  `);
  return deletedCartProduct
}

module.exports = {
  getAllCartProducts,
  getCartProductByCartId,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct
}