const fs = require('fs')
const getAllTours = (req, res) => {
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`))
    res.status(200).json({
        status: 'success',
        data: tours
    })
}

const creatTour = (req, res) => {

}
const getTour = (req, res) => {
    // const tourId = 
}

module.exports = {creatTour, getAllTours, getTour}