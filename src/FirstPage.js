export default function FirstPage(props){
    return(
        <div className="fisrtpage">
        <h1>Quiz App</h1>
        <p>Test Your Skills</p>
        <button onClick={props.controlStart} className="start-button">Start Quiz</button>
        </div>
    )
}