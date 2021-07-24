'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const proxyquire = require('proxyquire').noCallThru()

describe('routes', () => {
  let routes, Joi, Handler

  beforeEach(() => {
    Joi = {
      object: sinon.stub().returns('object')
    }
    Handler = {
      check_health: sinon.stub(),
      format_data: sinon.stub(),
      page_not_found: sinon.stub()
    }

    routes = proxyquire('../../lib/routes', {
      'joi': Joi,
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
        validate: {
          payload: 'object'
        }
      }
    }

    assert.deepEqual(routes[2], expected)
  })
})