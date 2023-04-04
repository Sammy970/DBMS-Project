const { MongoClient, Binary } = require('mongodb')
const fs = require('fs');

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uri = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"

const client = new MongoClient(uri)

async function downloadPDF(databaseName, collectionName, dataName) {
    await client.connect();
    const database = client.db(databaseName)
    const collection = database.collection(collectionName);

    const find = await collection.findOne({ name: dataName });
    const data1 = find.data.buffer;
    const fileName = dataName + '.pdf';
    // console.log(fileName);

    fs.writeFileSync(fileName, data1, 'binary');
}

module.exports = downloadPDF;