import express, { json } from 'express' 
import { data as initialData } from './data.js' 
import cors from 'cors'
import morgan from 'morgan'


const app = express() 
app.use(json()) 
app.use(cors())
app.use(morgan('dev'))
let data = initialData
const port = 3000 


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
    res.status(200).json(data) 
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
    const newPerson = {
        id: newId,
        name: person.name,
        number: person.number
    
    }
    data = data.concat(newPerson)
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
