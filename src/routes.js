const express = require('express')

const routes = express.Router()
const AuthorApi = require('./api/AuthorAPI')
const ArticleApi = require('./api/ArticleAPI')

routes.post('/api/sign-up', AuthorApi.signup)
routes.post('/api/login', AuthorApi.login)

routes.delete('/api/admin/authors/:id', AuthorApi.delete)
routes.put('/api/admin/authors/:id', AuthorApi.update)
routes.get('/api/admin/authors/', AuthorApi.get)

routes.post('/api/admin/articles', ArticleApi.create)
routes.delete('/api/admin/articles/:id', ArticleApi.delete)
routes.put('/api/admin/articles/:id', ArticleApi.update)

routes.get('/api/articles', ArticleApi.getByCategory)
routes.get('/api/articles/:id', ArticleApi.getById)

module.exports = routes