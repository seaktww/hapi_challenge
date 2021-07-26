'use strict'

const Joi = require('joi')
const Handler = require('./handlers')
const Validator = require('./validators')

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
    validate: Validator.post_data_format()
  }
}, {
  method: 'GET',
  path: '/repositories',
  handler: Handler.search_repositories,
  options: {
    validate: Validator.get_repositories()
  }
}]

module.exports = routes