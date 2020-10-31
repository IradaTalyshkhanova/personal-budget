const mongoose = require("mongoose")

const bud_schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true ,
        uppercase: true,

    },
    budget: {
        type: Number, 
        trim: true, 
        required: true,
    },
    color: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minlength: 7,
        maxlength: 7,
    }
}, {collection: 'personal-budget'});

module.exports = mongoose.model('myBudget', bud_schema)


        