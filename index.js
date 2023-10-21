// npm i express cors mongodb dotenv 
// add .gitignore

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// handle Requests
// let userArray = [];
// const handleRequests = (user) => {
//     // userArray.push(user);
// }

// set your DB_USER=<userName> & DB_PASS=<userPassword>
// Don't Commit after seting DB_USER & DB_PASS here. Test it then set .env then then commit.
// const uri = "mongodb+srv://<DB_USER>:<DB_PASS>@cluster0.hlezmce.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlezmce.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect(); // Don't Edit & add await before client.connect();
        // Send a ping to confirm a successful connection
        // User app.post to receive the rew

        // Change DB Name
        const database = client.db("userDB");
        // Change Collection Name
        const userCollection = database.collection("users");

        // User another GET, POST, PUT PATCH & DELET Method here

        // POST Method (demo)
        app.post("/users", async (req, res) => {
            const user = await req.body
            console.log("New user", user);

            // // insert user
            const result = await userCollection.insertOne(user);
            res.send(result);
        });
        


        // Mongo Response Don't Edit & add await before client.db
        // await client.db("admin").command({ ping: 1 });
        client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close(); // Don't Close the connection if we want to continue the connection
    }
}
run().catch(console.dir);

// Root GET (default)
app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});