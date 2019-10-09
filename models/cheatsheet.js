const mongoose = require('mongoose');

const cheatsheetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    installCommand: {
        type: String,
        required: false
    },
    downloadLink: {
        type: String,
        required: false
    },
    docs: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Cheatsheet', cheatsheetSchema);