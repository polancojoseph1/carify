const pg = require('pg');

const {
  getCartByUserId,
  getCartByCartId,
  addCart,
  updateCart
} = require('./cart')
const {
  getAllCartProducts,
  getCartProductsByCartId,
  getCartProductByCartIdAndProductId,
  addCartProduct,
  updateCartProductAdd,
  updateCartProductChange,
  deleteCartProduct
} = require('./cartProduct')
const {
  getAllPayments,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment
} = require('./payment')
const {
  getAllPaymentAccountsJoinPayment,
  getPaymentAccountById,
  addPaymentAccount,
  updatePaymentAccount,
  deletePaymentAccount
} = require('./paymentAccount')
const {
  getAllProducts,
  getProductsByColor,
  getProductsByRating,
  getProductsByPrice,
  getProductById,
  addProduct,
  updateProduct
} = require('./product')
const {
  getAllUsers,
  getUserById,
  updateUser
} = require('./user')
const {
  loginUser,
  signUpUser,
  guestUser
} = require('./auth')

const { Pool } = pg;
require('dotenv').config()

  
const getConnection = (callback = null) => {
  // NOTE: PostgreSQL creates a superuser by default on localhost using the OS username.
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

  const connection = {
    pool,
    query: (...args) => {
      return pool.connect().then((client) => {
        return client.query(...args).then((res) => {
          client.release();
          return res.rows;
        });
      });
    },
  };

  process.postgresql = connection;

  if (callback) {
    callback(connection);
  }

  return connection;
};

module.exports = {
  getConnection,
  getCartByUserId,
  getCartByCartId,
  addCart,
  updateCart,
  getAllCartProducts,
  getCartProductsByCartId,
  getCartProductByCartIdAndProductId,
  addCartProduct,
  updateCartProductAdd,
  updateCartProductChange,
  deleteCartProduct,
  getAllPayments,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment,
  getAllPaymentAccountsJoinPayment,
  getPaymentAccountById,
  addPaymentAccount,
  updatePaymentAccount,
  deletePaymentAccount,
  getAllProducts,
  getProductsByColor,
  getProductsByRating,
  getProductsByPrice,
  getProductById,
  addProduct,
  updateProduct,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  signUpUser,
  guestUser
}