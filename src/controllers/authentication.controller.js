const response = require('../utils/reponse')
const Admin = require('../models/admin.model')
const Invite = require('../models/invite.model')
const bcrypt = require('bcrypt')
exports.login = async (req, res) => {
    const {email, password} = req.body
    let admin = await Admin.findOne({email}).exec()
    if (admin) {
        const isPassword = bcrypt.compareSync(password, admin.password)
        if (isPassword) {
            let token = Admin.generateToken({id: admin._id})
            return response.sendSuccess(res, {
                message: 'Login successfully',
                data: {
                    access_token: token, refresh_token: token, admin
                }
            })
        }
    }
    return response.sendError(res, {
        message: 'Invalid email or password', status: 403
    })
}
exports.invite = async (req, res) => {
    try {
        let admin = req.admin
        const data = req.body
        data.owner = admin._id
        data.token = Invite.generateToken()
        const invite = await Invite.create(data)
        return response.sendSuccess(res, {
            message: 'Invite sent successfully',
            data: invite
        })
    }catch (e) {
        console.log(e)
        return response.internalServerError(res)
    }
}

exports.resendInvite = async (req, res) => {
    const invite = await Invite.findById(req.params.id).lean().exec()
    if (invite && invite.accepted != true) {
        // resend invite
        const newInvite = await Invite.findByIdAndUpdate(invite._id, {
            token: Invite.generateToken()
        }, {new: true}).exec();
        return response.sendSuccess(res, {message: 'invite sent successfully'})
    }

    return response.sendError(res, {message: 'Invite not found'});
}


exports.acceptInvite = async (req, res) => {
    const {token} = req.body
    const invite = await Invite.findOneAndUpdate({token}, {
        status: 'accepted',
        accepted_at: new Date()
    }, {new: true}).lean().exec()
    if (invite) {
        return response.sendSuccess(res, {message: 'Invite accepted successfully.', data: {
                inviteId: invite._id,
                accepted: new Date()
            }
        })
    }
}

exports.createAccount = async (req, res) => {
    try {
        const id = req.params.invite;
        const account = req.body
        console.log(id)
        const invite = await Invite.findById(id).lean().exec()
        if (invite) {
            //const avatar = uploads(req.files.avatar, 'profile')
            //const company = Company.findOne({owner: invite.owner}).lean().exec()
            //account.password = User.getHashedPassword(account.password)
            account.email = invite.email
            account.email_verified_at = new Date()
           // account.company = await company._id
            //account.avatar = await avatar
            const user = await Admin.create(account)
            return response.sendSuccess(res, {message: 'account added successfully', data: user})
        }
        return response.sendError(res, {message: 'No invite found', status: 404})
    }catch (e) {
        console.log(e)
        return response.internalServerError(res)
    }
}