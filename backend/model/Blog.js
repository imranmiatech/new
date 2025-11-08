const mongoose = require("mongoose");
//const validator = require("validator");

const blogSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
       
    },
    description: {
        type: String,
        required: true,
       
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },

    fileAvatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    
    date: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model("Blog", blogSchema);
