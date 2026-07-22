export const Person = ({namevalue, onNameChange, numberValue, onNumberChange,}) => {
    return <div>
        <div>
          name: <input value={namevalue} onChange={onNameChange} />
        </div>
        <div>number: <input onChange={onNumberChange} type="tel" name="phone" id="phone" value={numberValue}/></div>
       
    </div>
}