require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

// MongoDB Setup
const dbURI = process.env.MONGOURI
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

//Register View engine and favicon
app.set('view engine', 'ejs')
app.use(favicon(__dirname + '/public/favicon.ico'))

// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // To accept data
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

//
app.use((request, response, next) => {
  response.locals.path = require.path
  next()
})

// Handling Routes
app.get('/', requireAuth, (request, response) => {
  response.render('home', { title: 'NodeBlog | Home' })
})

app.get('/about', requireAuth, checkUser, (request, response) => {
  response.render('about', { title: 'NodeBlog | About' })
})

// All Routes
app.get('*', checkUser)
// Blog Routes
app.use('/blogs', requireAuth, blogRoutes) // First parameter check, if we're in /blogs route
// Auth Routes
app.use('/auth', authRoutes)

// Handling 404 only if request reaches this point. DON'T MOVE UPPER
app.use((request, response) => {
  response.status(404).render('err404', { title: 'NodeBlog | 404' })
})
