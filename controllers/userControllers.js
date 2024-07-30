const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// Utility function to filter allowed fields
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        if (allowedFields.includes(key)) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
};



exports.updateMe = catchAsync(async(req, res, next) => {
    if(req.body.password || req.body.passwordConfirm) {
        return next( new AppError('this rout is not for password update', 400))
    }

    const filterBody = filterObj(req.body, 'email', 'name');
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true
    });

    // Send response
    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    })
});

exports.deleteMe = catchAsync( async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active : false});


    res.status(204).json({
        status : 'success',
        data : null
    })
});

exports.getMe = catchAsync( async( req, res, next) => {
    req.params.id = req.user.id;
    next()
})



exports.createUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'this rout not yet defind'
    })
}

exports.getUser = factory.getOne(User)
exports.getAllUsers = factory.getAll(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)
