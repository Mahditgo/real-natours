const Tour = require('./../models/tourModel')
const catchAsync = require('./../utils/catchAsync');


exports.getOverview = catchAsync(async(req, res, next) => {

    const tours = await Tour.find();


    res.status(200).render('overview', {
        title : 'get all tour',
        tours
    })
})

exports.getTour = catchAsync(async(req, res) => {
     const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path : 'reviews',
        fields : 'review user rating'
     })

    res.status(200).render('tour', {
        title : `${tour.name} Tour`,
        tour
    })
});


exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title : 'Log into your account'
    })
}