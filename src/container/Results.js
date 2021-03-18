import React from 'react'

function Results() {
    return (
        <div>
             <h1>Result</h1>
            <h1>Score 10 / {localStorage.getItem("userscore")}</h1>
        </div>
    )
}

export default Results
