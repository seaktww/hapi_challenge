'use strict'

const Joi = require('joi')

exports.post_data_format = () => {
  return {
    payload: Joi.object()
  }
}

exports.get_repositories = () => {
  return {
    query: Joi.object({
      key: Joi.string(),
      page: Joi.number().min(1).max(100).default(1)
    })
  }
}