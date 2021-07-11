const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  console.log(err.message, err.code) // err.code to check if email is unique
  let errors = { email: '', password: '' }

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'Email is not correct or not registered'
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'Password is not valid'
  }

  // Duplicate error code 11000
  if (err.code === 11000) {
    errors.email = 'This email is already registered'
    return errors
  }

  // Validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// Create JSON web token
const maxAge = 3 * 24 * 60 * 60 // == 3 days in seconds
const createToken = (id) => {
  //  WARNING: DONT PUBLISH THIS! DONT PUBLISH THIS!
  return jwt.sign({ id }, 'eGCFxjGnwaR2sH7VCThK', {
    expiresIn: maxAge,
  })
}

// Controller actions
module.exports.signup_get = (request, response) => {
  response.render('signup', { title: 'NodeBlog | Signup' })
}

module.exports.login_get = (request, response) => {
  response.render('login', { title: 'NodeBlog | Login' })
}

module.exports.signup_post = async (request, response) => {
  const { email, password } = request.body

  try {
    const user = await User.create({ email, password })
    const token = createToken(user._id)
    response.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    response.status(201).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    response.status(400).json({ errors })
  }
}

module.exports.login_post = async (request, response) => {
  const { email, password } = request.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    response.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    response.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    response.status(400).json({ errors })
  }
}

module.exports.logout_get = (request, response) => {
  response.cookie('jwt', '', { maxAge: 1 }) // We just replace existing cookie aka delete
  response.redirect('/')
}
