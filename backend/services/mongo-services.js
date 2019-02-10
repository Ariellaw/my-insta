const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'AriellaGram';

// Create a new MongoClient
const client = new MongoClient(url);

function connectToMongoDB() {


    var res = client.connect()
        .then(prm => {
            console.log("Connected successfully to server and to AriellaGram");

            const db = client.db(dbName);
            return db;

        }).catch(err =>
            console.log("Failed to connect to MongoDB", err)

        );
    
    return res;


    // Use connect method to connect to the Server

}



module.exports = {
    connect: connectToMongoDB
}



// const insertDocuments = function (db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([
//         { a: 1 }, { a: 2 }, { a: 3 }
//     ], function (err, result) {
//         assert.equal(err, null);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     });
// }
// const findDocuments = function (db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Find some documents
//     collection.find({}).toArray(function (err, docs) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }


