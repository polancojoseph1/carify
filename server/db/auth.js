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
    password
  )
  VALUES (
    ${newId},
    'guest',
    '${`guest${randomKey}@email.com`}',
    'guest'
  )
  LIMIT 1
  RETURNING *
  `
  const [user] = await process.postgresql.query(query);
  return user
}

module.exports = {
  loginUser,
  signUpUser,
  guestUser
}