import { useState } from "react"

function Header () {
  return <h1>Give Feedback</h1>
}
function Button ({child, onClick}) {
return <button onClick={onClick}>{child}</button>
}
function StatisticLine ({text, val}) {
  console.log(val)

  return <p>{text}: {val}</p>
}
function Statistics (props) {
console.log(props)
  return(
    <div>
      <table>
      <thead>
        <tr>
          <th>
            Statistics
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
<StatisticLine text="good" val={props.gd}/>        
          </td>
           </tr>
           <tr>

          <td>
<StatisticLine text="bad" val={props.bd}/>
          </td>
           </tr>
           <tr>

          <td>
<StatisticLine text="neutral" val={props.neut}/>

          </td>
           </tr>

           <tr>

          <td>
<StatisticLine text="all" val={props.all}/>

          </td>
           </tr>
           <tr>

          <td>
<StatisticLine text="average" val={props.avg}/>
          </td>
           </tr>
           <tr>

          <td>

<StatisticLine text="Percent" val={props.cent}/>
          </td>
       
           </tr>
      </tbody>
      
      </table>

    </div>
  )

}



const App = () => {
const [good, setGood] = useState(0);
const [neutral, setNeutral] = useState(0);
const [bad, setBad] = useState(0);
const [total, setTotal] = useState(0);
const [average, setAverage] = useState(0);
const [positveInCent, setPositiveInCent] = useState(0)


const hanleGoodClick = () => {
  const updatedVal = good + 1;
  
const totalVal = updatedVal + neutral + bad



const averageVal = totalVal/3;

const positveInCentVal =  updatedVal/totalVal * 100

setGood(good + 1)
setTotal(totalVal)
setAverage(averageVal)
setPositiveInCent(positveInCentVal)

}
const handleNeutralClick = () => {
  const updatedVal = neutral + 1
const totalVal = updatedVal + good + bad
const averageVal = totalVal/3;
const positveInCentVal =  good/totalVal * 100
setNeutral(neutral + 1)
setTotal(totalVal)
setAverage(averageVal)
setPositiveInCent(positveInCentVal)
}
const handleBadClick = () => {
  const updatedVal = bad + 1

  const totalVal = updatedVal + neutral + good
const averageVal = totalVal/3;
const positveInCentVal =  good/totalVal * 100
setBad(bad + 1)
setTotal(totalVal)
setAverage(averageVal)
setPositiveInCent(positveInCentVal)

}
const statProps =
  {
    gd: good,
    neut: neutral,
    bd: bad,
    all: total,
    avg: average,
    cent: positveInCent

  }



return (
  <div>
    <Header/>
    <Button child={"good"} onClick={hanleGoodClick}/>
    <Button child={"neutral"} onClick={handleNeutralClick}/>
    <Button child={"bad"} onClick={handleBadClick}/>

       
    {average === 0 ? <p>No feed back given</p> :
   <Statistics {...statProps}/>
  
    }
      
   
  </div>
)



}
export default App