import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/myorganizer`;
let db = null;
const DB_NAME = "myAppReactDB";
const DB_COLLECTION_NAME = "users";
export async function connectDB(){
    if(db){
        return db;
    }
    let client = await MongoClient.connect(url, {useNewUrlParser: true})
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));;
    try {
    db = client.db(DB_NAME);
    const collection = db.collection(DB_COLLECTION_NAME);
    const res = await collection.find().toArray();
    console.log(res);
    return res
    }
 catch (err) {
    console.log(err);
    return err;    
}
finally {
    console.info("Got DB", db);
    return db;
}

}

//connectDB();