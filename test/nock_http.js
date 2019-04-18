const http = require('http')
const nock = require('nock')
const log = require('./_log')
const events = ['socket', 'response', 'end', 'data']

nock('http://dummy.restapiexample.com')
  .get('/v1/api/employees')
  .reply(200, 'OK')

const req = http.get('http://dummy.restapiexample.com/v1/api/employees', function(res) {
  events.forEach(log(res, 'res'))
})

events.forEach(log(req, 'req'))