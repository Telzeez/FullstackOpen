export const Filter =({value, onChange}) => {

    return (
       
            <div>Filter shown with <input type="text" name="filter" id="filter" onChange={onChange} value={value}/></div>
    
    )
}