module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/app/dashboard')
  }

  return next()
}
