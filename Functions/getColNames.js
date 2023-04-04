const { MongoClient, Binary } = require('mongodb')

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uri = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"

const client = new MongoClient(uri)

async function getColNames(databaseName) {
    await client.connect();
    const database = client.db(databaseName);

    var collection = {};

    collection = await database.listCollections().toArray();

    const colList = collection.map(db => db.name);
    return colList;
}

module.exports = getColNames;