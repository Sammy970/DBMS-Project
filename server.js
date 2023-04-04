const express = require('express')
const { MongoClient, Binary } = require('mongodb')
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Importing Functions
const getDBNames = require('./Functions/getDBNames');
const getColNames = require('./Functions/getColNames'); 
const getData = require('./Functions/getData');
const downloadPDF = require('./Functions/downloadPDF');
const uploadPDF = require('./Functions/uploadPDF');
const previewPDF = require('./Functions/previewPDF');


const uriLogin = "mongodb+srv://samyakTest:samyakTest@testcluster.eqeij01.mongodb.net/test"
const uri = "mongodb+srv://samyak970:samyak970@dbms.krybkqj.mongodb.net/test"
const dbName = "Creds"
const colName = "Login"

const app = express();
const client = new MongoClient(uri)
const clientLogin = new MongoClient(uriLogin)

const upload = multer({ dest: 'uploads/' });

async function checkCred(username, password, res) {
    await clientLogin.connect();
    const database = clientLogin.db("Creds")
    const collection = database.collection("Login");

    const find = await collection.findOne({ "username": username });
    // console.log(find.emailID);
    try {
        const pass = find.pass;
        if (pass == password) {
            console.log("Correct Password")
            app.locals.loginState = "true";
            res.send("loginTrue");
        } else {
            res.send("loginFalse");
            return;
        }
    } catch (err) {
        console.log(err)
        res.send("Not found")
    }
    finally {
        await clientLogin.close();
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/pdf', limit: '10mb' }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const dbList = await getDBNames();
    res.render('user', { dbList });
})

app.get('/admin', async (req, res) => {
    if (app.locals.loginState == "true") {
        const dbList = await getDBNames();
        res.render('admin', { dbList });
    } else {
        res.render('adminLogin');
    }
})

app.get('/login', async (req, res) => {
    res.render('adminLogin');
})

app.post('/loginCred', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    checkCred(username, password, res);
})

app.post('/logout', async (req, res) => {
    app.locals.loginState = "false"
    res.redirect('/admin');
})

// Downloading PDF
app.post('/filter1', async (req, res) => {
    const formdata = req.body.filter;
    const colList = await getColNames(formdata);
    res.send(colList);
})

app.post('/filter2', async (req, res) => {
    const databaseName = req.body.data1;
    const collectionName = req.body.data2;
    const data = await getData(databaseName, collectionName);
    res.send(data);
    // console.log(data);
})

app.post('/filter3', async (req, res) => {

    app.locals.databaseName = req.body.data1;
    app.locals.collectionName = req.body.data2;
    app.locals.dataName = req.body.data3;

    await downloadPDF(app.locals.databaseName, app.locals.collectionName, app.locals.dataName);

    res.send("Goa")
    // res.redirect('/test');
})

app.get('/download', (req, res) => {
    var dataName = app.locals.dataName;

    const filePath = './' + dataName + '.pdf';
    const fileName = dataName + '.pdf';

    // set the response headers to indicate that the response will contain a file
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // read the file from the file system and pipe it to the response object
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on('close', () => {
        fs.unlink(filePath, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('File deleted');
            }
        });
    });
})

// Uploading PDF
app.post('/filter4', async (req, res) => {
    app.locals.databaseName = req.body.filterUP;
    const colList = await getColNames(app.locals.databaseName);
    res.send(colList);
})

app.post('/filter5', upload.single('pdf'), async (req, res) => {
    const databaseName = app.locals.databaseName;
    const collectionName = req.body.filterUP;
    const pdfName = req.body.pdfName;
    const pdfFilePath = req.file.path;

    await uploadPDF(databaseName, collectionName, pdfName, pdfFilePath);

    uploadFolderPath = "./uploads"

    fs.readdir(uploadFolderPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        // Loop through all the files in the folder
        files.forEach(file => {
            // Delete the file
            fs.unlink(`${uploadFolderPath}/${file}`, err => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Deleted file: ${file}`);
            });
        });
    })

    res.status(200).send("Success");

})

// Preview PDF
app.get('/preview', async (req, res) => {
    var databaseName = app.locals.databaseName
    var collectionName = app.locals.collectionName
    var dataName = app.locals.dataName
    previewPDF(databaseName, collectionName, dataName, res);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));