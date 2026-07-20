import { Header } from "../Header";
import { Content } from "../Content";
import { Total } from "../Total";
export const Nodejs = ({courses}) => {
  const course = courses[1]
  const coursePart = course.parts
  

    return (
        <div>
        <Header course={course}/>
        <Content  course={course}/>
        <Total coursePart={coursePart}/>
        </div>
       
    )
}