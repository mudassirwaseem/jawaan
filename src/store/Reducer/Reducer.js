
const INITIAL_STATE = {
    Quizs: [],
    Python: [],
    Javascript: [],
    HtmlCss: []
}



export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case "JAVASCRIPT":
            return ({
                ...state,
                Javascript: [action.payload]
            })
        case "PHYTHON":
            return ({
                ...state,
                Python: [action.payload]
            })
        case "HTMLQUIZ":
            return ({
                ...state,
                HtmlCss: [action.payload]
            })
        case "Quiz":
            return ({
                ...state,
                Quizs: [action.payload]
            })
        default:
            return state

    }
}