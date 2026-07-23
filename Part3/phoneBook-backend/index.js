import express, { json } from 'express' 
 
import mongoose, { mongo } from 'mongoose'
import dns from 'node:dns'
import morgan from 'morgan'
import { stringify } from 'node:querystring'
import Phone from './phone.js'
dns.setServers(['1.1.1.1', '8.8.8.8'])






const app = express() 
app.use(json()) 

app.use(morgan('dev'))
app.use(express.static('dist'))



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
    res.send("Ohh sorry nothing is here did you forget to add api/persons?") 
}) 
app.get('/info', async (req, res) => {
    try {
        const count = await Phone.countDocuments()
    const dateRequested = new Date()
    res.send(`Phone book has info for ${count} people <br>  ${dateRequested}`)
    } catch (error) {
       res.status(500).send('Error retrieving info') 
    }
    
})

// get all 
app.get("/api/persons", (req, res) => { 
    Phone.find({}).then(result => {
        res.json(result)
    }).catch(error => {
    console.error('Full error object:', error);   // logs the entire error
    console.error('Error message:', error.message);
    res.status(500).json({ error: 'failed to retrieve database documents' });
})})

// get one by id
app.get("/api/persons/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const findRequestedPerson = await Phone.findById(id);
         if(!findRequestedPerson){
       return res.status(404).json({ error: 'Person not found' })
    }
     res.status(200).json(findRequestedPerson)
    } catch (error) {
         if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });}
console.error(error);
    res.status(500).json({ error: 'Failed to retrieve person' });
    }})
    
    // delete
    app.delete('/api/persons/:id', async (req, res) => {
     const id  = req.params.id
        try {
            const personToDelete = await Phone.findByIdAndDelete(id);
            if(!personToDelete){
                return res.status(404).send("person not found")
            }
            res.status(204).end()
            
        } catch (error) {
             console.error('Error deleting person:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
          res.status(500).json({ error: 'Failed to delete person' });
        }
    })
    // Post create
    app.post('/api/persons', async (req, res) => {
      
        const {name, number}= req.body
        if(!name || !number){
            return res.status(400).json({error: "Name and numbers are required"})
        }
        try {
             const existingPerson = await Phone.findOne({name})
            if(existingPerson) {
                return res.status(409).send(`The user with the name ${name} exist`)
            }  
              const newPerson =new Phone({name, number})
   const saved =  await newPerson.save()
   res.status(201).json(saved)
        } catch (error) {
              console.error('Error creating person:', error);
        res.status(500).json({ error: 'Failed to create person' });
        }
        
       
      
   })
 
// update
app.put('/api/persons/:id', async (req, res) => {
    const id = req.params.id

    const name  = req.body.name
    const number = req.body.number
    try {
        const updatedPerson = await Phone.findByIdAndUpdate(
        id,
        {name, number},
        {new: true, runValidators: true}
    )
    if(!updatedPerson){
        return res.status(404).json({error: "person not found"})
    }

res.status(200).json(updatedPerson)
    } catch (error) {
        console.error('Error updating person:', error);   // logs the entire error
     if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
    res.status(500).json({ error: 'failed to update data' });
    }
    
})

const port = process.env.PORT || 3001
if(process.env.NODE_ENV !== 'production'){
app.listen(port, () => { 
    console.log(`Server is up listening on port ${port}`) 
})
}


export default app;
