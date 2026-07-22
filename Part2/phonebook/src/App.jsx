import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { getAll, update, create, deletePhoneBook } from './services'
import { Notification } from './components/Notification'

const App = () => {



  

  const [persons, setPersons] = useState([
   
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTag, setFilterTag] = useState("")
  const [message, setMessage] = useState(null);
  const [customSyle, setCustomStle] = useState("")


  useEffect(() => {
     const fetchContacts = async () => {
      try {
    
      const returnedData = await getAll()
      setPersons(returnedData)
     }
      
     catch (error) {
      console.error("Failed to fetch contacts: ", error.message)
      setMessage("Failed to fetch contacts")
      setCustomStle("error")
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }};
    fetchContacts();

  

  }, [])

  const addName =  async (event) => {
    const getNewName = newName.trim()
    const getNewNumber = newNumber.trim()
    event.preventDefault();
    console.log(getNewName)
    console.log(getNewNumber)
    if(!getNewName || !getNewNumber){
      setMessage("please fill the two field")
      setCustomStle("error")
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      return

    }
    const credentialsAlreadyExist = persons.find(person => person.name === getNewName && person.number === getNewNumber)
    if(credentialsAlreadyExist){
     setMessage(`The person with this name ${getNewName} and ${getNewNumber} already exist`)
     setCustomStle("error")
     setTimeout(() => {
      setMessage(null)
     }, 5000);
      return
    }
    // check if the name exist but with different number
    const nameExist = persons.find(person => person.name.toLowerCase() === getNewName.toLocaleLowerCase()) 
    console.log("name exist: ", nameExist)
    if(nameExist){
      const confirmUpdate = window.confirm(
        `${getNewName} already exist replace the old phone number`
      );
      if(confirmUpdate){
        try {
          const updatedPerson = {...nameExist, number: getNewNumber}
          const returnedData = await update(nameExist.id, updatedPerson)
          setPersons(
            persons.map(p => p.id === nameExist.id ? returnedData : p))
            setNewName("")
            setNewNumber("")
            setMessage("Contact updated successfully")
            setCustomStle("success")
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          
        } catch (error) {
          console.error("cannot update the field: ", error.message)
                setMessage(`information of ${nameExist.name} has already been removed from server`)
                setPersons(persons.filter(p=>p.id !== nameExist.id))
      setCustomStle("error")
      setTimeout(() => {
        setMessage(null)
      }, 5000);
        }
      };
      return 
    }
   try {
    const nameObj = {name: getNewName, number:getNewNumber}
    const returnedData = await create(nameObj)
    setPersons(persons.concat(returnedData))
    setNewName("")
    setNewNumber("")
    setMessage(`Added ${nameObj.name}`)
   } catch (error) {
    console.error("Error creating new Name: ", error)
    setMessage("Error adding the contact")
    setCustomStle("error")
  setTimeout(() => {
    setMessage(null)
  }, 5000);
   }
  }
  const personToShow = filterTag.trim() === "" ? persons: persons.filter(person => person.name.toLowerCase().includes(filterTag.toLowerCase()))
 const handleDelete = async (id) => {
  const personToDelete = persons.find(p => p.id === id) 
  if(!personToDelete) return;
  const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
  if(!confirmDelete) return;

  try {
    await deletePhoneBook(id)
    setPersons(persons.filter(p => p.id !== id))
    setMessage(`${personToDelete.name} deleted successfully`)
    setCustomStle("success")
    setTimeout(() => {
     setMessage(null)
    }, 5000);
  } catch (error) {
    console.error("Error deleting the user details: ", error.message)
  }
  
 }
  return (
    <div className='container'>
      <h2>Phonebook</h2>
      <Notification message={message} className={customSyle}/>
        <Filter value={filterTag} onChange={(e) =>setFilterTag(e.target.value)}/>
        <h3>Add a new note</h3>
        <PersonForm 
        onSubmit={addName}
        nameValue={newName}
        onNameChange={(e) => setNewName(e.target.value)}
       numberValue={newNumber}
       onNumberChange={(e) => setNewNumber(e.target.value)}
        />
        <h3>Numbers</h3>
        <Persons personToShow={personToShow} onDelete={handleDelete}/>
    </div>
  )
}

export default App


