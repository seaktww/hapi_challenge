'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const proxyquire = require('proxyquire').noCallThru()

describe('routes', () => {
  let routes, Handler, Validator

  beforeEach(() => {
    Validator = {
      post_data_format: sinon.stub().returns('post_data_format_validator'),
      get_repositories: sinon.stub().returns('get_repositories_validator')
    }
    Handler = {
      check_health: sinon.stub(),
      format_data: sinon.stub(),
      page_not_found: sinon.stub(),
      search_repositories: sinon.stub()
    }

    routes = proxyquire('../../lib/routes', {
      './validators': Validator,
      './handlers': Handler
    })
  })

  it('should set up health check route', () => {
    const expected = {
      method: 'GET',
      path: '/health',
      handler: Handler.check_health
    }

    assert.deepEqual(routes[0], expected)
  })

  it('should set up handle route does not exist', () => {
    const expected = {
      method: '*',
      path: '/{any*}',
      handler: Handler.page_not_found
    }

    assert.deepEqual(routes[1], expected)
  })

  it('should set up format data route', () => {
    const expected = {
      method: 'POST',
      path: '/data/format',
      handler: Handler.format_data,
      options: {
        validate: 'post_data_format_validator'
      }
    }

    assert.deepEqual(routes[2], expected)
  })

  it('should set up search repositories route', () => {
    const expected = {
      method: 'GET',
      path: '/repositories',
      handler: Handler.search_repositories,
      options: {
        validate: 'get_repositories_validator'
      }
    }

    assert.deepEqual(routes[3], expected)
  })
})

