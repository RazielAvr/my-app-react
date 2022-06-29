import {v4 as uuid} from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';
var timeout = require('express-timeout-handler');


const authenticationTokens = [];


async function assembleUserState(user){
    let db = await connectDB();

    let tasks = await db.collection(`tasks`).find({owner:user.id}).toArray();
    let groups = await db.collection(`groups`).find({owner:user.id}).toArray();

    return{
        tasks,
        groups,
        session:{authenticated: `AUTHENTICATED`,id:user.id}
    }

}


export const authenticationRoute = app =>{

    app.post('/authenticate',timeout.set(4000),async (req,res)=>{
       try{
           console.log(req.body);
           let {username, password} = req.body;
        let db =  await connectDB();
        let collection = db.collection(`users`);

        let user = await collection.findOne({name:username});
        console.log(user);
        if(!user){
            return res.status(500).send("User not found");
        };

        let hash = md5(password);
    }
    catch(e){
        let passwordCorrect = hash === user.passwordHash;
        console.log('error', e);
        if(!passwordCorrect){
            return res.status(500).send("Password Incorrect");
        }
    }

        let token = uuid();

        authenticationTokens.push({
            token,
            userID:user.id
        });

        let state = await assembleUserState(user);

        res.send({token,state});

    })

};