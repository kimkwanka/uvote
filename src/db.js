const mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fcc';
const mongoose = require('mongoose');

mongoose.connect(mongoURI);
const db = mongoose.connection;

// eslint-disable-next-line
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () => { /* Connection was established */ });

const storeSchema = mongoose.Schema({
  polls: [{
    question: String,
    options: [String],
    votes: [Number],
    author: String,
    voterIPs: [String],
    voterNames: [String] }],
});

const Store = mongoose.model('Poll', storeSchema);

module.exports = Store;
