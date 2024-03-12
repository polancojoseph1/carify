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

async function loginUser(email, password) {
  const query = `
    SELECT * FROM "user"
    WHERE
      email = '${email}' AND
      password = '${password}'
    LIMIT 1`;
  const [user] = await process.postgresql.query(query);
  return user
}

async function signUpUser(newId, email, name, password) {
  const query = `
    INSERT INTO "user" (
      id,
      email,
      name,
      password
    )
    VALUES (
      ${newId},
      '${email}', 
      '${name}',
      '${password}'
    )
    RETURNING *
    `
  const [user] = await process.postgresql.query(query);
  return user
}

async function guestUser(newId, randomKey) {
  const query = `
  INSERT INTO "user" (
    id,
    name,
    email,
    guest,
    password
  )
  VALUES (
    ${newId},
    'guest',
    '${`guest${randomKey}@email.com`}',
    ${true},
    'guest'
  )
  LIMIT 1
  RETURNING *
  `
  const [user] = await process.postgresql.query(query);
  return user
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  signUpUser,
  guestUser
}