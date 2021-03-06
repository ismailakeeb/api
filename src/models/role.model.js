const db = require('../core/db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 *  {
 *      admin: {
 *          dashboard: [],
 *          template: [],
 *          billing: []
 *      }
 *
 *  }
 * @type {string[]}
 */
const roles = ['admin', 'developer', 'owner']
const permissions = ['dashboard', 'template', 'billing', 'reports','users', 'transactions']

const role = new Schema({
    name: {type: String},
    roles: [{
        name: {type: String},
        permissions: {type: Array},
    }],
    description: {type: String},
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleted_at: 'deleted_at'}
})

module.exports = db.model('Role', role)
