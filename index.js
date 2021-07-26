'use strict'

const Hapi = require('@hapi/hapi')
const Vision = require('@hapi/vision')
const Routes = require('./lib/routes')
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
})

const init = async () => {
  await server.register(Vision)
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates'
  })
  server.route(Routes)

  await server.start()
}

init()
