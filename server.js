const fs = require('fs')
const express = require('express')


const app = express()

app.get('/', (req, res) => {
    res.status(200).json({message:'Hello from server side!', app: 'Natours'})
})

// const tours= JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// app.get('/api/v1/tours', (req, res) => {
//     res.status(200).json({
//         statuse: 'success',
//         data: tours
//     })
// })
// const tour = 
// app.get('/api/v1/tours/id', (req, res) => {
//     res.status(200).json({
//         statuse: 'success',
//         data: tours
//     })
// })

app.use(express.json())

const router = require('./route/tours/tour')
app.use('/api/v1/tours', router)

const port = 3000
app.listen(port, () => {
    console.log(`App running on port:${port}...`)
})