import { Person } from "./person"
export const PersonForm = ({onSubmit, nameValue, onNameChange, numberValue, onNumberChange}) => {
return <form action="" onSubmit={onSubmit}>
<Person 
namevalue={nameValue}
onNameChange={onNameChange}
numberValue={numberValue}
onNumberChange={onNumberChange}
/>
<button type="submit">Add</button>

</form>
}