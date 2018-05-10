const mongoose = require('mongoose')
const db = 'mongodb://localhost/trailer'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  let maxConnect = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnect++
      if (maxConnect < 3) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库连接失败~')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnect++
      if (maxConnect < 3) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库连接失败~')
      }
    })

    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB Connected Successfully!')
    })
  })
}