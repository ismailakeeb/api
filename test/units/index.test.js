const supertest = require('supertest')
const {app} = require('../../src/core/express')
const request = supertest(app)
describe('express running', () => {
    it('should run express app', function () {
        request.get('/').then(res => {
            expect(200).toBe(res.statusCode)
        })
    });
})