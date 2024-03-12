async function getAllUsers() {
  // explicitly select only the id and email fields - even though
  // users' passwords are encrypted, it won't help if we just
  // send everything to anyone who asks!
  const query = `SELECT id, email, name FROM "user";`
  const users = await process.postgresql.query(query);
  return users;
}

async function getUserById(id) {
  // explicitly select only the id and email fields - even though
  // users' passwords are encrypted, it won't help if we just
  // send everything to anyone who asks!
  const query = `
  SELECT 
    id, email, name, guest, admin 
  FROM 
    "user"
  WHERE
    id = ${id};`
  const users = await process.postgresql.query(query);
  return users;
}

async function updateUser(id, name, email) {
  const query = `
    UPDATE "user" 
    SET
      email = '${email}', 
      name = '${name}'
    WHERE
      id = ${id}
    RETURNING *;
    `
  const user = await process.postgresql.query(query);
  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser
}