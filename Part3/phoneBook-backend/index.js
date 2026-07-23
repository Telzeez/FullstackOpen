import express, { json } from 'express' 
import { data as initialData } from './data.js' 
import mongoose, { mongo } from 'mongoose'

import morgan from 'morgan'
import { stringify } from 'node:querystring'
import Phone from './phone.js'
import phone from './phone.js'






const app = express() 
app.use(json()) 

app.use(morgan('dev'))
app.use(express.static('dist'))
let data = initialData
const port = process.env.PORT || 3001 

// if (process.argv.length < 2) {
//     console.log("run the command with your password and contact to add");
//     process.exit(1)
// }
// const password = process.argv[2]
// // get mongoose url
// const url =  `mongodb+srv://Phonebook:${password}@cluster0.ix2etki.mongodb.net/phonebook_db`
// // enable strict query and create connection
// mongoose.set('strictQuery', true)
// mongoose.connect(url, {family: 4})
// // create a schema blueprint for the note Object
// const phoneSchema = new mongoose.Schema({
//     name: String,
//     number: String
// })
// phoneSchema.set('toJSON', {
//     transform: (document, returnedObject) =>{
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })
// const Phone = mongoose.model('Phone', phoneSchema)
// // if (process.argv.length === 3) {
// //     Phone.find({}).then(result =>{
// //         result.forEach(phone => {
// //             console.log(phone)
// //         });
// //         mongoose.connection.close()
// //     })
// // }




const longFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'short'
});
morgan.token('body', (req, res)=> {
    if(req.method === 'POST' || req.method === 'PUT'){
        return JSON.stringify(req.body)
    }
    return ''
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.get("/", (req, res) => { 
    res.send("Ohh sorry nothing is here did you forget to add api/notes?") 
}) 

app.get("/api/persons", (req, res) => { 
    Phone.find({}).then(result => {
        res.json(result)
    })
}) 
app.get('/info', (req, res) => {
    const dateRequested = new Date()
    res.send(`Phone book has info for ${data.length} people <br>  ${dateRequested}`)
})
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const findRequestedPerson = data.find(person => person.id === id)
    if(!findRequestedPerson){
        res.status(404).send("No such person")
    }else{
        res.status(200).send(findRequestedPerson)

    }})


app.delete('/api/persons/:id', (req, res) => {
    let id  = req.params.id
    data = data.filter(d => d.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const newId = Math.random().toString(36).substring(2, 9)
    const person = req.body
    const thisUserExist = data.find(p => p.name === person.name)
    if(!person.name ){
       return res.status(400).send("Name is required")
    }
    if(thisUserExist){
        return res.status(409).send(`The user with the name ${thisUserExist.name} exist`)
    }
    const newPerson = new Phone({
        id: newId,
        name: person.name,
        number: person.number
    
    })
    phone.save().then(savedPhone => {
        console.log(savedPhone)
        res.json(savedPhone)

    })
 
    res.status(201).json(newPerson)
})


app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    const personId = data.findIndex(p => p.id === id)
    if(personId === -1){
        return res.status(404).send(`The user with the name cant be found`)
    }
    const updatedPerson = {
        ...data[personId], number: body.number
    }
data = data.map(p=> p.id === id ? updatedPerson : p)
res.status(200).json(updatedPerson)
})
app.listen(port, () => { 
    console.log(`Server is up listening on port ${port}`) 
})

export default app;
