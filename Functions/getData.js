const { MongoClient, Binary } = require('mongodb')

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uri = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"

const client = new MongoClient(uri)

async function getData(databaseName, collectionName) {
    await client.connect();
    const database = client.db(databaseName)
    const collection = database.collection(collectionName);

    const colFind = await collection.find({})
    const find = await colFind.map(doc => doc.name).toArray();
    return find;
}

module.exports = getData;