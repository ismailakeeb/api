const db = require('../core/db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const business = new Schema({
    approved: {type: Number},
    disapproved: {type: Number},
    total: {type: Number}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleted_at: 'deleted_at'}
})