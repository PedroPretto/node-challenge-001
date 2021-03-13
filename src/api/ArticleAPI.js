const services = require('../services/ArticleService')

module.exports = {
  create: async(req, res) => {
    const token = req.header('token')
    const is_admin = (req.header('is_admin') === 'true')
    const data = req.body
    const message = await services.articleCreate(token, is_admin, data)

    return res.status(message.code).json({data: message.data})
  },

  getByCategory: async(req, res) => {

    const {category} = req.query

    const message = await services.articleGetByCategory(category)

    return res.status(message.code).json(message.data)
  },

  delete: async(req, res) => {
    const token = req.header('token')
    const is_admin = (req.header('is_admin') === 'true')
    const {id} = req.params

    const message = await services.articleDelete(token, is_admin, id)
    return res.status(message.code).json({data: message.data})
  },

  update: async(req, res) => {
    const token = req.header('token')
    const is_admin = (req.header('is_admin') === 'true')
    const {id} = req.params
    const data = req.body

    const message = services.articleUpdate(token, is_admin, id, data)
    return res.status(message.code).json({data: message.data})
  },

  getById: async(req, res) => {
    const token = req.header('token')
    const {id} = req.params

    const message = await services.getArticleById(token, id)
    return res.status(message.code).json(message.data)
  }
}
