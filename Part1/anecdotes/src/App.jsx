import { useState } from "react"



const App = () => {
  const [selected, setSelected] = useState(0);


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const emptyArr = Array.from({ length: anecdotes.length }, (_, i) => i)
  // console.log(emptyArr)
  const voteArr = emptyArr.map(vote =>
    ({ [vote]: 0 })
  )
  const [votes, setVotes] = useState(voteArr)




  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    console.log(randomNum)
    setSelected(randomNum)
    console.log(votes)
  }
  const handleVoteClick = () => {
    const selectedVote = selected
    console.log(selectedVote)

    // find the vote
    const copyVotes = [...votes]
    copyVotes[selected][selected] = (copyVotes[selected][selected] || 0) + 1
    setVotes(copyVotes)
    console.log("selected ", votes)
  }
  let maxVote = 0;
  let maxVoteIndex = 0;
  votes.forEach((obj, index) => {
    const voteCount = obj[index];
    if (voteCount > maxVote) {
      maxVote = voteCount
      maxVoteIndex = index
    }
  })

  return (<div>
    <h1>Anecdote of the day</h1>
    <p>
      {anecdotes[selected]}
    </p>
    <button type="text" onClick={handleVoteClick}>Vote</button>
    <button type="text" onClick={handleClick}>next anecdote</button>
    <div>
      <h2>
        Anecdote with the most vote
      </h2>
      {maxVote === 0 ? <p>No vote count yet</p> :
        <div>
          <p>
            {anecdotes[maxVoteIndex]}
          </p>
          <p>
            has {maxVote} votes
          </p>
        </div>

      }

    </div>
  </div>)
}
export default App