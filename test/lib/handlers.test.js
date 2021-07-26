'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const proxyquire = require('proxyquire').noCallThru()

describe('handler', () => {
  let handler, Tree, Github 

  beforeEach(() => {
    Tree = {
      initial: sinon.stub(),
      map_data: sinon.stub()
    }
    Github = {
      search_repositories: sinon.stub()
    }
    handler = proxyquire('../../lib/handlers', {
      './tree': Tree,
      './github': Github 
    })
  })

  describe('check_health()', () => {
    it('should response message', () => {
      const expected = { message: "I am Good." }
      const result = handler.check_health()

      assert.deepEqual(result, { message: "I am Good." })
    })
  })

  describe('page_not_found()', () => {
    it('should response message', () => {
      const expected = { message: "Page Not Found." }
      const result = handler.page_not_found()
      
      assert.deepEqual(result, expected)
    })
  })

  describe('format_data()', () => {
    it('should call initial and map_data', () => {
      const request = {
        payload: {
          key: 'value'
        }
      }
      const expected = [{ key: 'value' }]
      const initial_result = {
        list_of_data: 'list_of_data',
        mapper: 'mapper'
      }

      Tree.initial.returns(initial_result)
      Tree.map_data.returns(expected)

      const result = handler.format_data(request)
      assert(Tree.initial.calledWithExactly(request.payload))
      assert(Tree.map_data.calledWithExactly(initial_result.list_of_data, initial_result.mapper))
      assert.equal(result, expected)
    })
  })

  describe('search_repositories()', () => {
    const request = {
      query: {
        key: 'keyword',
        page: 1
      }
    }
    const limit_per_page = 10
    
    it('should search repositories with key, target_page, limit_per_page', async () => {    
      const h = {
        view: sinon.stub()
      }

      await handler.search_repositories(request, h)
      assert.equal(Github.search_repositories.args[0][0], request.query.key)
      assert.equal(Github.search_repositories.args[0][1], request.query.page)
      assert.equal(Github.search_repositories.args[0][2], limit_per_page)
    })

    it('should return index page', async () => {
      Github.search_repositories.returns({ key: 'value'})
      const h = {
        view: sinon.stub()
      }
      
      const result = await handler.search_repositories(request, h)
      assert.equal(h.view.args[0][0], 'index')
      assert.deepEqual(h.view.args[0][1], { key: 'value'})
    })

    it('should return error page when got some error', async () => {
      Github.search_repositories.throws({ message: 'error', status: 400 })
      const h = {
        view: sinon.stub()
      }
      
      try {
        await handler.search_repositories(request, h)
      } catch (error) {
        assert.deepEqual(h.view.args[0][0], 'error')
        assert.deepEqual(h.view.args[0][1], {
          message: error.message
        })
      }
    })
  })
})