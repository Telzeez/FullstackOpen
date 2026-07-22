export const Persons = ({personToShow, onDelete}) => {
return <div>
    {personToShow.map(person => <p key={person.id}>{person.name} {person.number}  <button onClick={() => onDelete(person.id)}>Delete</button></p>)}
</div>
}