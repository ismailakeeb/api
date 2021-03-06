const db = require('../core/db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const invite = new Schema({
    owner: {type: mongoose.Types.ObjectId},
    email: {type: String},
    status: {type: String, default: 'pending'},
    token: {type: String},
    roles: [{type: mongoose.Types.ObjectId, ref: 'Role'}]
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleted_at: 'deleted_at'}
})
invite.statics = {
    generateToken() {
        return bcrypt.hashSync(Math.random().toString(36).slice(-8), bcrypt.genSaltSync())
    }
}

module.exports = db.model('Invite', invite)