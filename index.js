const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


//middleware

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5bzwfvz.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const dataBase = client.db("coffee").collection("coffee");

    
    app.get('/coffee', async(req, res) => {
       
      const cursor = dataBase.find();
      const result = await cursor.toArray();
      res.send(result);

    })


    app.post('/coffee' , async (req, res ) => {

       const coffee = req.body;
       
       const result = await dataBase.insertOne(coffee);  
       res.send(result);

    })
    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {

    res.send('Coffe Server is running!!')
})

app.listen(port, () => {
    console.log(`Port is running ${port}`)
})