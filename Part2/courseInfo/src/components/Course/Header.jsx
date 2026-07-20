export const Header = ({course}) => {
    return <h2 id={course.id}>{
        course.name
    }</h2>
}