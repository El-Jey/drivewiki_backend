'use strict'

const config = () => {
  return {
    app: {
      name: "Cars Wiki"
    },
    db: {
      host: "127.0.0.1",
      user: "local",
      password: "local1",
      database: "drive_wiki"
    }
  }
}

module.exports = config();
