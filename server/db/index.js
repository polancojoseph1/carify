const postgresql = require('pg');
const os = require('os');
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

const { Pool } = postgresql;

  
const getConnection = (callback = null) => {
  // NOTE: PostgreSQL creates a superuser by default on localhost using the OS username.
  const pool = new Pool({
    user: process.env.NODE_ENV === 'development' && (os.userInfo() || {}).username || '',
    database: 'carify',
    password: '',
    host: '127.0.0.1',
    port: 5432,
  });

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