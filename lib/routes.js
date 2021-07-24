'use strict'

const Joi = require('joi')
const Handler = require('./handlers')

const routes = [{
  method: 'GET',
  path: '/health',
  handler: Handler.check_health
}, {
  method: '*',
  path: '/{any*}',
  handler: Handler.page_not_found
}, {
  method: 'POST',
  path: '/data/format',
  handler: Handler.format_data,
  options: {
    validate: {
      payload: Joi.object()
    }
  }
}]

module.exports = routes