const db = require('../models/AuthorModel')
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = {
  authorSignup: async(data) => {
    const userExists = await db.checkIfExists(data.email)
    if(userExists.length != 0){
      return({
        code:409,
        data: 'This e-mail is already registered'
      })
    }

    const toSave = {
      name: data.name,
      email: data.email,
      password: sha1(data.password),
      picture: data.picture,
      is_admin: data.is_admin
    }

    try{
      await db.createAuthor(toSave)
      return({
        code: 201,
        data: 'Author was successfully created!'
      })
    }catch(e){
      console.log(e)
      return({
        code: 400,
        data: 'Sorry, something went wrong!'
      })
    }
  },

  authorLogin: async(data) => {
    const userExists = await db.checkIfExists(data.email)
    if(userExists.length === 0){
      return({
        code:404,
        data: 'This user is not registered'
      })
    }

    const [{id, email, password}] = await db.getAuthorByEmail(data.email)
    if(data.email === email && sha1(data.password) === password){
      const token = jwt.sign({id: id}, config.secret, {
        expiresIn: 300
      })
      return({
        code:200,
        data: 'Successfully logged in',
        token
      })
    }
  },

  authorDelete: async(id, token, is_admin) => {
    const userExists = await db.getAuthorById(id)

    if(userExists.length === 0){
      return({
        code:404,
        data: 'This user is not registered'
      })
    }

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
      await db.removeAuthor(id)
      return({
        code: 200,
        data: 'Author was successfully deleted!'
      })
    }catch(e){
      console.log(e)
      return({
        code:400,
        data: 'Sorry, something went wrong!'
      })
    }
  },

  authorUpdate: async(id, token, is_admin, changes) => {
    const userExists = await db.getAuthorById(id)
    if(userExists.length === 0){
      return({
        code:404,
        data: 'This user is not registered'
      })
    }

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

    const data = {
      name: changes.name,
      email: changes.email,
      password: sha1(changes.password),
      picture: changes.picture,
      is_admin: changes.is_admin
    }

    try{
      await db.updateAuthor(id, data)
      return({
        code: 200,
        data: 'Author was successfully updated!'
      })
    }catch(e){
      console.log(e)
      return({
        code:400,
        data: 'Sorry, something went wrong!'
      })
    }


  },
  
  authorIndex: async(token, is_admin) => {
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
      const authors = await db.getAuthors()
      return({
        code: 200,
        data: authors
      })
    }catch(e){
      console.log(e)
      return({
        code:400,
        data: 'Sorry, something went wrong!'
      })
    }
  }

}