const express = require('express')

const routes = express.Router()
const AuthorApi = require('./api/AuthorAPi')

routes.post('/api/sign-up', AuthorApi.signup)
routes.post('/api/login', AuthorApi.login)
routes.delete('/api/admin/authors/:id', AuthorApi.delete)
routes.put('/api/admin/authors/:id', AuthorApi.update)
routes.get('/api/admin/authors/', AuthorApi.get)
module.exports = routes