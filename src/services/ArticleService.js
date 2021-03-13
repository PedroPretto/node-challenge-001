const db = require('../models/ArticleModel')
const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = {
  articleCreate: async(token, is_admin, data) => {
    if(!token){
      return({
        code:401,
        data: 'No token provided'
      })
    }

    try{
      jwt.verify(token, config.secret)
    }catch(e){
      console.log(e)
      return({
        code:401,
        data: 'Invalid token provided'
      })
    }
    
    if(!is_admin){
      return({
        code:403,
        data: 'Access forbidden!'
      })
    }

    try{
      db.createArticle(data)
      return({
        code:200,
        data: 'Article has been successfully created'
      })
    }catch(e){
      console.log(e)
      return({
        code:400,
        data: 'Sorry, something went wrong!'
      })
    }
  },

  articleGetByCategory: async(category) => {
    const result = await db.getArticleByCategory(category)

    if(result.length === 0){
      return({
        code:404,
        data: 'No articles found!'
      })
    }

    const data = result.map(a => {
      return {
        author:{
          name: a.name,
          picture: a.picture
        },
        category: a.category,
        title: a.title,
        summary: a.summary
      }
    })

    return({
      code:200,
      data
    })
  },

  articleDelete: async(token, is_admin, id) => {
    if(!token){
      return({
        code:401,
        data: 'No token provided'
      })
    }

    try{
      jwt.verify(token, config.secret)
    }catch(e){
      console.log(e)
      return({
        code:401,
        data: 'Invalid token provided'
      })
    }
    
    if(!is_admin){
      return({
        code:403,
        data: 'Access forbidden!'
      })
    }

    try{
      const removed = await db.removeArticle(id)
      if(removed > 0){
        return({
          code:200,
          data: 'Article has been successfully deleted!'
        })
      }
      return({
        code:400,
        data: 'Article not found!'
      })
    }catch(e){
      console.log(e)
      return({
        code:400,
        data: 'Sorry, something went wrong!'
      })
    }
  },

  articleUpdate: async(token, is_admin, id, data) => {
    if(!token){
      return({
        code:401,
        data: 'No token provided'
      })
    }

    try{
      jwt.verify(token, config.secret)
    }catch(e){
      console.log(e)
      return({
        code:401,
        data: 'Invalid token provided'
      })
    }
    
    if(!is_admin){
      return({
        code:403,
        data: 'Access forbidden!'
      })
    }

    try{
      const updated = await db.updateArticle(id, data)
      if(updated > 0){
        return({
          code:200,
          data: 'Article has been successfully updated!'
        })
      }
      return({
        code:400,
        data: 'Article not found!'
      })
    }catch(e){
      console.log(e)
      return({
        code:400,
        data: 'Sorry, something went wrong!'
      })
    }
  },

  getArticleById: async(token, id) => {
    const data = await db.getArticleById(id)
    const article = formatArticle(token, data[0])
    if(article){
      return({
        code:200,
        data: article
      })
    }

    return({
      code:400,
      data: 'Something went wrong!'
    })
  }
}

const formatArticle = (token, data) => {
  if(!token){
    return{
      author:{
        name: data.name,
        picture: data.picture
      },
      category: data.category,
      title: data.title,
      summary: data.summary,
      firstParagraph: data.first_paragraph,
    }
  }

  try{
    jwt.verify(token, config.secret)
    return{
      author:{
        name: data.name,
        picture: data.picture
      },
      category: data.category,
      title: data.title,
      summary: data.summary,
      firstParagraph: data.first_paragraph,
      body: data.body
    }
  }catch(e){
    console.log(e)
    return 0
  }
 
}