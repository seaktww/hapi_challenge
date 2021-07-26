'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const proxyquire = require('proxyquire').noCallThru()

describe('github', () => {
  let github, axios

  beforeEach(() => {
    axios = sinon.stub()
    github = proxyquire('../../lib/github', {
      'axios': axios
    })
  })

  describe('search_repositories()', () => {
    const key = 'nodejs'
    const page = 1
    const per_page = 10
    const querystring = 'q=nodejs&page=1&per_page=10'

    it('should call request to github', async () => {
      const github_response = {
        data: {
          total_count: 1001,
          items: []
        }
      }
      axios.returns(github_response)

      const result = await github.search_repositories(key, page, per_page)
      assert.deepEqual(axios.args[0][0], {
        method: 'get',
        url: `https://api.github.com/search/repositories?${querystring}`
      })
    })

    it('should response 100 page when result more than 100 page', async () => {
      const github_response = {
        data: {
          total_count: 1001,
          items: []
        }
      }
      axios.returns(github_response)

      const result = await github.search_repositories(key, page, per_page)
      assert.deepEqual(result, {
        total_pages: 100,
        page: 1,
        items: [],
        total_item_results: 1001
      })
    })

    it('should response page following github result when result less than 100 page', async () => {
      const github_response = {
        data: {
          total_count: 91,
          items: []
        }
      }
      axios.returns(github_response)

      const result = await github.search_repositories(key, page, per_page)
      assert.deepEqual(result, {
        total_pages: 10,
        page: 1,
        items: [],
        total_item_results: 91
      })
    })

    it('should throw error when got error from github', async () => {
      const github_response = {
        response: {
          status: 400,
          data: {
            message: 'have some occurs.'
          }
        }
      }
      const expected = {
        status: 400,
        message: 'have some occurs.'
      }
      axios.throws(github_response)

      try {
        await github.search_repositories(key, page, per_page)
      } catch (error) {
        assert.deepEqual(error, expected)
      }
    })
  })
})

