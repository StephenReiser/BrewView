const mongoose = require('mongoose')

const brewSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: String,
    phone: String,
    email: String,
    latitude: Number,
    longitude: Number,
    website: String,
    mainImage: String,
    imageTwo: String,
    imageThree: String,
    imageFour: String,
    dogFriendly: {type: String, required: true},
    outsideFood: {type: String, required: true},
    foodTrucks: {type: String, required: true},
    glutenFree: {type: String, required: true},
    comments: [{
        username: String,
        userComments: String,
    }]
    ///I think this will work by pushing like $push: {
    // comments: {
//      "username": xyz
//      "userComments": xyz
    // }}
    //

})
const Brew = mongoose.model('Brew', brewSchema)

module.exports = Brew


////This is a work in progress