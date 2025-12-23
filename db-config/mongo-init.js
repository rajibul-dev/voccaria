const voccariaDB = process.env.CORE_DB_MONGODB_VOCCARIA;
const voccariaUser = process.env.CORE_DB_MONGODB_VOCCARIA_USER_USERNAME;
const voccariaUserPassword = process.env.CORE_DB_MONGODB_VOCCARIA_USER_PASSWORD;

db = db.getSiblingDB(voccariaDB);

db.createUser({
  user: voccariaUser,
  pwd: voccariaUserPassword,
  roles: [{ role: "readWrite", db: voccariaDB }],
});
