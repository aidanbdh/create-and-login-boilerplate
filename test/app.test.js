/* globals describe it before after */

const { expect } = require('chai')
const request = require('request')
const app = require('../server/app.js')

describe('server', () => {

  let server

  before(done => {
    server = app.listen(3001, () => done())
  })

  after(() => {
    server.close()
  })

  describe('get /', () => {

    it('returns a response', done => {
      request.get('http://localhost:3001', { json: true }, (err, res, body) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        expect(body).to.include('html')
        done()
      })
    })

  })

  describe('post /login', () => {

    it('returns profile date for the user posted', done => {
      const options = {
        json: true,
        'content-type': 'application/json',
        body: { email: 'test@test.info' }
      }
      request.post('http://localhost:3001/login', options, (err, res, body) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        expect(body).to.deep.equal({ email: 'test@test.info', name: 'test' })
        done()
      })
    })

  })

})
