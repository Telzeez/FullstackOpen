export const Course = ({course}) => {
const courseParts = course.parts

return (
    <div>
        <h1>{course.name}</h1>

        {
            courseParts.map(coursePart => (
                <p key={coursePart.name}>{coursePart.name} {coursePart.exercises} </p>
            )

            )
        }
    </div>
)
}
