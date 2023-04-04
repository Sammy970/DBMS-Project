const { MongoClient, Binary } = require('mongodb')

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uriQuestionPaper = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"
const uriSyllabus = "mongodb+srv://samyak970:samyak970@syllabus.wq1luon.mongodb.net/test"
const uriNotes = "mongodb+srv://samyak970:samyak970@notes.jymuq4j.mongodb.net/test"

const clientQuestionPaper = new MongoClient(uriQuestionPaper)
const clientSyllabus = new MongoClient(uriSyllabus)
const clientNotes = new MongoClient(uriNotes);

async function getColNames(databaseName, selection) {
    switch (selection) {
        case "qp":
            await clientQuestionPaper.connect();
            var database = clientQuestionPaper.db(databaseName);
            var collection = {};
            collection = await database.listCollections().toArray();
            var colList = collection.map(db => db.name);
            return colList;
            break;

        case "syllabus":
            await clientSyllabus.connect();
            var database = clientSyllabus.db(databaseName);
            var collection = {};
            collection = await database.listCollections().toArray();
            var colList = collection.map(db => db.name);
            return colList;
            break;

        case "notes":
            await clientNotes.connect();
            var database = clientNotes.db(databaseName);
            var collection = {};
            collection = await database.listCollections().toArray();
            var colList = collection.map(db => db.name);
            return colList;
            break;

        default:
            console.log("Default")
    }



}

module.exports = getColNames;