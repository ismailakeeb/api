const supper = require('supertest')
const {app} = require('../../src/core/express')
const re = supper(app)

describe('express app running ', () => {
    it('should start express on port ', function () {
        re.get('/').then(res => {
            expect(200).toBe(res.statusCode)
        })
    });
})