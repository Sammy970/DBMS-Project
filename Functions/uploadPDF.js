const { MongoClient, Binary } = require('mongodb')
const fs = require('fs');

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uri = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"

const client = new MongoClient(uri)


async function uploadPDF(databaseName, collectionName, pdfName, pdfFilePath) {
    await client.connect();
    const database = client.db(databaseName)
    const collection = database.collection(collectionName);

    const pdfFileData = fs.readFileSync(pdfFilePath);

    const pdfDocument = {
        name: pdfName,
        data: new Binary(pdfFileData),
        contentType: "application/pdf",
        uploadDate: new Date(),
    }

    const result = await collection.insertOne(pdfDocument);
    await client.close;
}

module.exports = uploadPDF;