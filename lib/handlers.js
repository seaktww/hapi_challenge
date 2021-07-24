'use strict'

const Tree = require('./tree')

exports.check_health = (request, h) => {
  const data = {
    "message": "I am Good."
  }

  return data
}

exports.page_not_found = (request, h) => {
  const data = {
    "message": "Page Not Found."
  }

  return data
}

exports.format_data = (request, h) => {
  const input = request.payload
  const { list_of_data, mapper } = Tree.initial(input)
  const result = Tree.map_data(list_of_data, mapper)

  return result
}