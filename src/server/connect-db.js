import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/myorganizer`;
let db = null;
const DB_NAME = 'myAppReactDB';
const DB_COLLECTION_NAME = 'users';


export async function connectDB(){
    if(db){
        return db;
    }
    MongoClient.connect(url, {useNewUrlParser: true}).then(client => {
        console.log('Connected to MongoDB server')
    
        const _db = client.db(DB_NAME);
    
        // Here you can place your operations with the bd
    
        console.info("Got DB");
        return _db;
    }, e => console.log('Error to connect', e))
//     .then(() => console.log("Connection Successful"))
//     .catch(err => console.log(err));
//     try {
//     db = client.db(DB_NAME);
//     const collection = db.collection(DB_COLLECTION_NAME);
//     const res = await collection.find().toArray();
//     console.log(res);
//     return res
//     }
//  catch (err) {
//     console.log(err);
//     return err;    
// }
// finally {
//     console.info("Got DB", db);
//     return db;
// }

}

//connectDB();