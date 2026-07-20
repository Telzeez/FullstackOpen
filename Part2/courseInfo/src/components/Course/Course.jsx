import { HalfStack } from "./parts/HalfStack"
import { Nodejs } from "./parts/Nodejs"
export const Course = ({courses}) => {


return (
    <div>
   <HalfStack courses={courses}/>
   <Nodejs courses={courses}/>

    </div>
)
}
