const express = require('express')
const app = express()
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const cors=require("cors")
const bodyParser= require("body-parser")
const port = 3000
dotenv.config()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
app.use(cors())
const dbName="passM"
app.use(bodyParser.json())
client.connect()

//Get all the passwords
app.get('/', async (req, res) => {
  const db=client.db(dbName)
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//Put passwords
app.post('/', async (req, res) => {
  const password=req.body;
  const db=client.db(dbName)
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true, result:findResult})
})

// delete passwords by id
app.delete('/', async (req, res) => {
  const password=req.body;
  const db=client.db(dbName)
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success:true, result:findResult})
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})