import express from 'express'
import dotenv from 'dotenv'


dotenv.config()

//initialize express app
const app = express()
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Server is running on port ${PORT}`)
})