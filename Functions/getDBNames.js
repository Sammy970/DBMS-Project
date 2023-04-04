const { MongoClient, Binary } = require('mongodb')

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uri = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"

const client = new MongoClient(uri)


async function getDBNames() {
    await client.connect();
    const database = await client.db().admin().listDatabases();
    // console.log(database.databases);
    const dbList = database.databases.map(db => db.name);
    return dbList;
}

module.exports = getDBNames;