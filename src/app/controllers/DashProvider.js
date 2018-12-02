const { Appointment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashProvider {
  async index (req, res) {
    const userSession = req.session.user

    const clients = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: userSession.id,
        date: {
          [Op.gt]: moment()
        }
      }
    })

    res.render('provider', { userSession, clients })
  }
}

module.exports = new DashProvider()
