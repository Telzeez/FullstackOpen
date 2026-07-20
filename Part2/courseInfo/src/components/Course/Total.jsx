export const Total = ({coursePart}) => {
console.log(coursePart)
    return <p>
        <strong>
         Total of  {coursePart.reduce((a,b) => a + b.exercises, 0)} exercises
    </strong> 

    </p>
}