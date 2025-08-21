import express from 'express'
import dotenv from 'dotenv'
import { AppDataSource } from './config/data-source'
import authRoutes from './routes/authRoutes'


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

// Auth routes
app.use('/api/auth',authRoutes)


// database connection
AppDataSource.initialize()
    .then(()=>console.log("🚀 Database Connected Successfully"))
    .catch((error)=>console.log("❌ Database Connection Failed", error))

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})