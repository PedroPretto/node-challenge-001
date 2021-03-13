const { update } = require('../database/index')
const connection = require('../database/index')

module.exports = {
  createArticle: async (data) => {
    return await connection('articles').insert(data)
  },

  getArticleByCategory: async (category) => {
    return await connection('articles')
      .join('authors','articles.author_id','=','authors.id')
      .select('authors.name','authors.picture','articles.category','articles.title','articles.summary')
      .where('category', 'like', `%${category}%`)
  },
  
  removeArticle: async(id) => {
    return await connection('articles').delete().where('id', id)
  },

  updateArticle: async(id, changes) => {
    return await connection('articles').update(changes).where('id',id)
  },

  getArticleById: async (id) => {
    return await connection('articles')
      .join('authors','articles.author_id','=','authors.id')
      .select('authors.name','authors.picture','articles.category','articles.title','articles.summary', 'articles.first_paragraph', 'articles.body')
      .where('articles.id', id)
  }
}