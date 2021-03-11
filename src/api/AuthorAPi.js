const services = require('../services/AuthorService')

module.exports = {
  signup: async (req, res) => {
    const message = await services.authorSignup(req.body)
    
    return res.status(message.code).json({data: message.data})
  },
  login: async (req, res) => {
    const message = await services.authorLogin(req.body)
    
    return res.status(message.code).json({data: message.data, token: message.token})
  },
  delete: async (req, res) => {
    const token = req.header('token')
    const is_admin = (req.header('is_admin') === 'true')
    const {id} = req.params

    const message = await services.authorDelete(id, token, is_admin)
    return res.status(message.code).json({data: message.data})
  },
  update: async(req, res) => {
    const {id} = req.params
    const token = req.header('token')
    const is_admin = (req.header('is_admin') === 'true')

    const changes = req.body

    const message = await services.authorUpdate(id, token, is_admin, changes)
    return res.status(message.code).json({data: message.data})
  },
  get: async(req, res) => {
    const token = req.header('token')
    const is_admin = (req.header('is_admin') === 'true')

    const message = await services.authorIndex(token, is_admin)
    return res.status(message.code).json({data: message.data})
  }
}