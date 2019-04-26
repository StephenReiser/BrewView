const mongoose = require('mongoose')

const brewSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lattitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    website: String,
    mainImage: String,
    imageTwo: String,
    imageThree: String,
    imageFour: String,
    dogFriendly: Boolean,
    outsideFood: Boolean,
    foodTrucks: Boolean,
    glutenFree: Boolean,
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