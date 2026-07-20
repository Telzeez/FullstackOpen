export const Content = ({course}) => {
    const courseParts = course.parts
    return <div>
  {
            courseParts.map(coursePart => (
                <p key={coursePart.name}>{coursePart.name} {coursePart.exercises} </p>
            )

            )
        }
    </div>
}