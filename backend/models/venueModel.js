const mongoose = require('mongoose');

// MongoDB Venue Collection Schema
const projectSchema = new mongoose.Schema({

    ItemNo: { type: Number, required:true },
    Description: { type: String, required:true },
   

});

module.exports = mongoose.model('Projects', projectSchema);



