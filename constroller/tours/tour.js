const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        tours: tours.length,
        data: tours
    })
}

const creatTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/tours-simple.json`, JSON.stringify(tours, err=> {
        res.status(201).json({
            status:'success',
            data: newTour
        })
    }))
}
const getTour = (req, res) => {
    // const tourId = 
}

module.exports = {creatTour, getAllTours, getTour}