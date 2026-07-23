import mongoose from "mongoose";
import 'dotenv/config'
import  dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])
mongoose.set('strictQuery', true)
const url = process.env.MONGODB_URI


mongoose.connect(url, {family:4}).then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('Error conneting to mongoDB: ', error.message)
})
const phoneSchema = new mongoose.Schema({
    name: String, 
    number: String
})
phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
       
    }
})
export default mongoose.model('Phone', phoneSchema)