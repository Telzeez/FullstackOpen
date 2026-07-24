import express, { json } from 'express' 
 
import mongoose, { mongo } from 'mongoose'
import dns from 'node:dns'
import morgan from 'morgan'
import { stringify } from 'node:querystring'
import Phone from './phone.js'
import cors from 'cors'
import { errorHandler } from './errorHandler.js'

dns.setServers(['1.1.1.1', '8.8.8.8'])

const app = express() 

// -----------------middlewares----------------
app.use(cors())
app.use(json()) 
app.use(morgan('dev')) 
app.use(express.static('dist'))


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
// morgan middleware
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

// GET method
app.get("/", (req, res, next) => { 
    res.send("Ohh sorry nothing is here did you forget to add api/persons?") 
})

// GET counts
app.get('/info', async (req, res, next) => {
    const dateRequested = new Date()
   Phone.countDocuments().then(count => {

       res.send(`Phone book has info for ${count} people <br>  ${dateRequested}`)
   }).catch(error => next(error))})

// get all   
app.get("/api/persons", (req, res, next) => { 
    Phone.find({}).then(result => {
        res.json(result)
    }).catch(error => {
        next(error)
    })})

    
    // get one by id
    app.get("/api/persons/:id",  (req, res, next) => {
        
    const id = req.params.id;
    console.log(`Searching for custom id: ${id} (Type: ${typeof id})`)
    Phone.findById(id).then(phone => {
        if(phone){
            res.json(phone)
        }else{
            res.status(404).end()
        }
    }).catch(error => next(error))})

// delete
    app.delete('/api/persons/:id', (req, res, next) => {
         const id  = req.params.id
         Phone.findByIdAndDelete(id).then(phone => {
             res.status(204).end()
         }).catch(error => next(error))
    })
      
       
            
      // Post create
    app.post('/api/persons', (req, res, next) => {
      
        const {name, number}= req.body
        if(!name || !number){
            return res.status(400).json({error: "Name and numbers are required"})
        }
        
        Phone.findOne({name}).then(existingPerson => {
if(existingPerson) {
                return res.status(409).send(`The user with the name ${name} exist`)
            } 
            const newPerson = new Phone({name, number})
newPerson.save().then(updatedPerson => res.status(201).json(updatedPerson))
             }).catch(error => next(error))
            })

 
 // update
app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const {name, number} = req.body
    
    Phone.findByIdAndUpdate(
        id,
        {name, number},
        {new: true, runValidators: true}
    ).then(updatedPerson => {
        if(!updatedPerson){
        return res.status(404).json({error: "person not found"})
    }
    res.status(200).json(updatedPerson)
}).catch(error => next(error))})

app.use(errorHandler)


const port = process.env.PORT || 3001
if(process.env.NODE_ENV !== 'production'){
app.listen(port, () => { 
    console.log(`Server is up listening on port ${port}`) 
})
}


export default app;
