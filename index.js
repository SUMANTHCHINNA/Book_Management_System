require('dotenv').config()
const express = require('express')
const userRouter = require('./router/user')
const bookRouter = require('./router/book')
const app = express()

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/user', bookRouter)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`The server running on PORT ${PORT}`)
})