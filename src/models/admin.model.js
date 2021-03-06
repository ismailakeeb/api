const db = require('../core/db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const admin = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    email_verified_at: {type: Date, default: null},
    roles: [{type: mongoose.Types.ObjectId, ref: 'Role'}],
    tokens: [{type: String}]

},{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleted_at: 'deleted_at'}
})

admin.statics = {
    generateToken(admin) {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign(admin, config.secret)
        this.findByIdAndUpdate(admin.id, {$addToSet: {tokens: token}}).exec()
        return token
    }
}

module.exports = db.model('Admin', admin)