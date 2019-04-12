const MongoClient = require('mongodb').MongoClient;
const secrets = require('../secrets.js');
var dataBaseConnection;
// Connection URL
const url = `mongodb+srv://AriellaGram:${secrets.getMongoDBPassword()}@ariellagram-yxske.mongodb.net/test?retryWrites=true`;

// Database Name
const dbName = 'AriellaGram';

// Create a new MongoClient
const client = new MongoClient(url);

/**
 * This should connect to the database when the server starts and stay connected until the site is shut down :-)
 */
function initDbConnection() {

    return client.connect()
        .then(connectedClient => {
            console.log("Connected successfully to server and to AriellaGram");
            dataBaseConnection = connectedClient;
            return dataBaseConnection;

        }).catch(err =>
            console.log("Failed to connect to MongoDB", err)
        );

}


/**
 * this creates a connection to the database when requested - it is too slow
 */
function connectToMongoDB() {

    return Promise.resolve(dataBaseConnection.db(dbName))

}



module.exports = {
    connect: connectToMongoDB,
    initDbConnection
}





