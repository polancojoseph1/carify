async function getAllCartProducts() {
  const cartProducts = await process.postgresql.query(`SELECT * FROM cart_product`);
  return cartProducts
}

async function getCartProductsByCartId(cartId) {
  const cartProducts = await process.postgresql.query(`
  SELECT 
    cp.*, 
    p.brand, 
    p.category, 
    p.price, 
    p.totalRating, 
    p.imageUrl, 
    p.description,
    p.quantity AS totalQuantity
  FROM cart_product cp
  LEFT JOIN product p ON cp.product_id = p.id
  WHERE
    cart_id = ${cartId}
  `);
  return cartProducts
}

async function getCartProductByCartIdAndProductId(cartId, 
  productId) {
  const [cartProduct] = await process.postgresql.query(`
  SELECT * FROM cart_product
  WHERE
    cart_id = ${cartId} AND
    product_id = ${productId}
  LIMIT 1;
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

async function updateCartProductAdd(cartId, productId, addedQuantity, addedPrice) {
  const updatedCartProduct = await process.postgresql.query(`
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

async function updateCartProductChange(id, changedQuantity, changedPrice) {
  const updatedCartProduct = await process.postgresql.query(`
    UPDATE cart_product 
    SET
      quantity = ${changedQuantity},
      totalPrice = ${changedPrice}
    WHERE
      id = ${id}
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
  getCartProductsByCartId,
  getCartProductByCartIdAndProductId,
  addCartProduct,
  updateCartProductAdd,
  updateCartProductChange,
  deleteCartProduct
}