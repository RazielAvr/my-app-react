import {v4 as uuid} from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';
let client = null;
module.exports = async (req, res) => {
    // Get the MongoClient by calling await on the promise.
    // Because it is a promise, it will only resolve once.
    client = await clientPromise;
    // Use the client to return the name of the connected database.
    res.status(200).json({ dbName: client.db().databaseName });
 }

const authenticationTokens = [];

async function assembleUserState(user){
    let db = client;

    let tasks = await db.collection(`tasks`).find({owner:user.id}).toArray();
    let groups = await db.collection(`groups`).find({owner:user.id}).toArray();

    return{
        tasks,
        groups,
        session:{authenticated: `AUTHENTICATED`,id:user.id}
    }

}


export const authenticationRoute = app =>{
    app.post('/authenticate',async (req,res)=>{
        console.log(res.body);
        let {username, password} = req.body;
        let db =  client;
        let collection = db.collection(`users`);

        let user = await collection.findOne({name:username});

        if(!user){
            return res.status(500).send("User not found");
        };

        let hash = md5(password);
        let passwordCorrect = hash === user.passwordHash;

        if(!passwordCorrect){
            return res.status(500).send("Password Incorrect");
        }

        let token = uuid();

        authenticationTokens.push({
            token,
            userID:user.id
        });

        let state = await assembleUserState(user);

        res.send({token,state});

    });
};