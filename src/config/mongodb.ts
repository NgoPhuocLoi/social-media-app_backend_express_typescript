import mongoose  from "mongoose";
import dotenv from "dotenv"
dotenv.config()
class MongoDB {
    static instance: MongoDB
    constructor(){
        this.connect();
        console.log('Here');
    }

    async connect(){

        try {
            await mongoose.connect(process.env.MONGODB_URI!);
            console.log("MongoDB is connected!");
        } catch (error) {
            console.log('Error when connecting to MongoDB. Error:: ' + error);
        }
    }
    static getInstance(){
        if(!MongoDB.instance){
            MongoDB.instance = new MongoDB()
        }
        return MongoDB.instance
    }
}


export default MongoDB