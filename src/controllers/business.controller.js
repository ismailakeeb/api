const Business = require('../models/business.model')
const response = require('../utils/reponse')

exports.analytics = async (req, res) => {
    const business = await Business.find({}).lean().exec()

}