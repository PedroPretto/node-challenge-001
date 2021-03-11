const connection = require('../database/index')

module.exports = {
  checkIfExists: async (email) => {
    return await connection('authors').select('email').where('email',email)
  },

  createAuthor: async(data) => {
    return await connection('authors').insert(data)
  },

  getAuthorByEmail: async(email) => {
    return await connection('authors').select('id','email', 'password').where('email', email)
  },

  getAuthorById: async(id) => {
    return await connection('authors').select().where('id',id)
  },

  removeAuthor: async(id) => {
    return await connection('authors').delete().where('id',id)
  },

  updateAuthor: async(id, changes) => {
    return await connection('authors').update(changes).where('id', id)
  },
  
  getAuthors: async() => {
    return await connection('authors').select()
  }
}