import mongoose from "mongoose";
import dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])



const password = process.argv[2]
const passedName = process.argv[3]
const passedNumber = process.argv[4]
if(process.argv.length < 2){
    console.log(`give password as argument and the contat to be added`)
    process.exit(1)
}



mongoose.set('strictQuery', true)

mongoose.connect(url, {family: 4})

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Phone = mongoose.model('Phone', phoneSchema)
if(process.argv.length === 3){
    console.log("Phonebook:")
    Phone.find({}).then(result => {
        result.forEach(phone => {
            console.log(`${phone.name} ${phone.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const passedName = process.argv[3]
    const passedNumber = process.argv[4]
    if(!passedName || !passedNumber){
        process.exit(1)
    
    }
const phone = new Phone({
    name: passedName,
    number: passedNumber,
})

phone.save().then(result => {
    console.log(`added ${passedName} number ${passedNumber} to phonebook`)
   
    mongoose.connection.close()
})
}
