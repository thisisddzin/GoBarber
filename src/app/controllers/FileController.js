const path = require('path')

class FileController {
  show (req, res) {
    const { file } = req.params

    const pathFile = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )

    return res.sendFile(pathFile)
  }
}

module.exports = new FileController()
