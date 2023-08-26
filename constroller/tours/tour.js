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
    const tourId = req.params.id * 1
    const tour = tours.find(el => el.id == tourId)
    
    if(!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Tour with this id not found"
        })
        
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}

const updateTour = (req, res) => {
    const tourId = req.params.id * 1
    const tour = tours.find(el => el.id == tourId)

    if(!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Tour with this id not found"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
        tour: '<Updated tour here...>'
       }
    })
    
}

const deleteTour = (req, res) => {
    const tourId = req.params.id * 1
    const tour = tours.find(el => el.id == tourId)

    if(!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Tour with this id not found"
        })
    }
    res.status(204).json({
        status: "success",
        data: null
    })
}

module.exports = {creatTour, getAllTours, getTour, updateTour, deleteTour}