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
      },
      order: [['date', 'ASC']]
    })

    res.render('provider', { userSession, clients })
  }

  cancel (req, res) {
    Appointment.destroy({
      where: {
        id: req.query.id
      }
    })

    res.redirect('/provider/refresh')
  }
}

module.exports = new DashProvider()
