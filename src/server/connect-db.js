

import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/myorganizer`;
const db = null;
const DB_NAME = 'myAppReactDB';
const DB_COLLECTION_NAME = 'users';
let client;


export async function connectDB(){
    if (db) return db;
    let client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db(DB_NAME);
    let user =  db.collection(`users`).findOne({id:"U1"});
    console.log(user);
    return db;
//     if(db){
//         return db;
//     }
//     MongoClient.connect(url, {useNewUrlParser: true}).then(client => {
//         console.log('Connected to MongoDB server')
    
//          db = client.db(DB_NAME);
        // _db.listCollections().toArray(function(err, names) {   
    //    if(!err) {
    //        //console.log(names)
    //        console.info("Got DB");
    //    }
//         return db;
//    });
// }).catch((err) => {
 
//    // Printing the error message
//    console.log(err.Message);
// }, e => console.log('Error to connect', e))

}

//connectDB();