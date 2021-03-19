import React from 'react'

function Results() {
    const resultsData = JSON.parse(localStorage.getItem("results"))
    return (
        <div className="App">
             <h1>Result</h1>

            <h1> Course : {resultsData.language}</h1> 
            <h1>Score 10 / {resultsData.score}</h1>
        </div>
    )
}

export default Results
