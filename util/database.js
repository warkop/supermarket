const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://moden:2udBQbrUWNyJIUkm@cluster0-8vr93.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => { 
        console.log('Connected');
        callback(client);
    })
    .catch(err => { 
        console.log(err)
    });
}
module.exports = mongoConnect;
