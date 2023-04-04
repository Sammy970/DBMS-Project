const { MongoClient, Binary } = require('mongodb')

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uri = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"

const client = new MongoClient(uri)

async function previewPDF(databaseName, collectionName, dataName, res) {
    await client.connect();
    const database = client.db(databaseName)
    const collection = database.collection(collectionName);

    const find = await collection.findOne({ name: dataName });
    const data1 = find.data.buffer;
    const fileName = dataName + '.pdf';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);

    res.send(data1);
}

module.exports = previewPDF;