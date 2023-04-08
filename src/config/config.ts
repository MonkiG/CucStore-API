export default {
  jwtSecret: process.env.JWT_SECRET ?? '63756373746f7265617069736563726574',
  DB: {
    URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/',
    DB_NAME: process.env.MONGODB_NAME ?? 'CucStore'
  }
}
