class RefreshController {
  refresh (req, res) {
    res.redirect('/app/provider')
  }
}

module.exports = new RefreshController()
