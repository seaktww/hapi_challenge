'use strict'

const Tree = require('./tree')
const Github = require('./github')

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

exports.search_repositories = async (request, h) => {
  try {
    const { key, page } = request.query
    const LIMIT_PER_PAGE = 10
    const search_result = await Github.search_repositories(key, page, LIMIT_PER_PAGE)
  
    return h.view('index', search_result)
  } catch (error) {
    return h.view('error', { message: error.message })
  }
}