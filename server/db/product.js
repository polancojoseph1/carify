async function getAllProducts() {
  const products = await process.postgresql.query('SELECT * FROM product');
  return products
}

async function getProductById(id) {
  const query = `SELECT * FROM product WHERE id = ${id} LIMIT 1`
  const product = await process.postgresql.query(query);
  return product;
}

async function addProduct(
  newId,
  brand,
  model,
  category,
  color,
  price,
  condition,
  description,
  quantity,
  imageUrl,
  totalRating,
  numberRating
) {
  const query = `
    INSERT INTO product (
      id,
      brand, 
      model, 
      category, 
      color, 
      price, 
      condition, 
      description, 
      quantity, 
      imageUrl, 
      totalRating, 
      numberRating
    )
    VALUES (
      ${newId},
      '${brand}', 
      '${model}', 
      '${category}', 
      '${color}', 
      ${price}, 
      '${condition}', 
      '${description.replace(/'/g, "''")}', 
      ${quantity}, 
      '${imageUrl}', 
      ${totalRating}, 
      ${numberRating}
    )
    RETURNING *;`;
  const newProduct = await process.postgresql.query(query)
  return newProduct
}

async function updateProduct(id, quantityBought) {
  const query = `
  UPDATE product
  SET quantity = quantity - ${quantityBought} 
  WHERE id = ${id}
  RETURNING *
  `
  const updatedProduct = await process.postgresql.query(query)
  return updatedProduct
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct
}