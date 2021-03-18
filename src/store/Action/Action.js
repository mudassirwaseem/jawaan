import firebase from '../../config/Firebase'

const Firebase_data =  () => {
    return (dispatch) => {
         let data =  firebase.database().ref("Quiz")
        data.on("value", datasnap => {
            console.log(datasnap.val())
        let quiz = (Object.values(datasnap.val())  )
        dispatch({ type: "Quiz", payload: quiz })
        })
    }
}


const HTMLQUIZ =  () => {
    return (dispatch) => {
         let data =  firebase.database().ref("HTMLQUIZ")
        data.on("value", datasnap => {
            console.log(datasnap.val())
        let quiz =  (Object.values(datasnap.val())  )
        dispatch({ type: "HTMLQUIZ", payload: quiz })
        })
    }
}


const JAVASCRIPT =  () => {
    return (dispatch) => {
         let data =  firebase.database().ref("JAVASCRIPT")
        data.on("value", datasnap => {
            console.log(datasnap.val())
        let quiz =  ( Object.values(datasnap.val()) )
        dispatch({ type: "JAVASCRIPT", payload: quiz })
        })
    }
}

const PHYTHON =  () => {
    return (dispatch) => {
         let data =  firebase.database().ref("PHYTHON")
        data.on("value", datasnap => {
            console.log(datasnap.val())
        let quiz =  ( Object.values(datasnap.val()))
        dispatch({ type: "PHYTHON", payload: quiz })
        })
    }
}





export {
    Firebase_data,
    HTMLQUIZ,
    JAVASCRIPT,
    PHYTHON
}

















