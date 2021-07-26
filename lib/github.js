'use strict'

const axios = require('axios')
const qs = require('querystring')

exports.search_repositories = async (key, page, per_page) => {
  try {
    const querystring = qs.stringify({ q: key, page, per_page })
    const search_result = await axios({
      method: 'get',
      url: `https://api.github.com/search/repositories?${querystring}`
    })
    const total_pages = Math.ceil(search_result.data.total_count / per_page) 

    return {
      total_pages: total_pages <= 100 ? total_pages : 100,
      page,
      items: search_result.data.items,
      total_item_results: search_result.data.total_count
    }
  } catch (error) {
    throw({
      status: error.response.status,
      message: error.response.data.message
    })
  }
}