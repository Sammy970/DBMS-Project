const { MongoClient, Binary } = require('mongodb')

const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uriQuestionPaper = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"
const uriSyllabus = "mongodb+srv://samyak970:samyak970@syllabus.wq1luon.mongodb.net/test"
const uriNotes = "mongodb+srv://samyak970:samyak970@notes.jymuq4j.mongodb.net/test"

const clientQuestionPaper = new MongoClient(uriQuestionPaper)
const clientSyllabus = new MongoClient(uriSyllabus)
const clientNotes = new MongoClient(uriNotes);


async function getDBNames(selection) {

    switch (selection) {
        case "qp":
            await clientQuestionPaper.connect();
            var database = await clientQuestionPaper.db().admin().listDatabases();
            // console.log(database.databases);
            var dbList = database.databases.map(db => db.name);
            return dbList;
            break;

        case "syllabus":
            await clientSyllabus.connect();
            var database = await clientSyllabus.db().admin().listDatabases();
            // console.log(database.databases);
            var dbList = database.databases.map(db => db.name);
            return dbList;
            break;

        case "notes":
            await clientNotes.connect();
            var database = await clientNotes.db().admin().listDatabases();
            // console.log(database.databases);
            var dbList = database.databases.map(db => db.name);
            return dbList;
            break;

        default:
            console.log("Default DB");
    }

}

module.exports = getDBNames;