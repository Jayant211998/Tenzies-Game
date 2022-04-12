import React from "react"
import Options from './Options'

let score = 0 
export default function Quiz(props){


    const [display,setDisplay] = React.useState([])
    let [isSubmit,setIsSubmit] = React.useState(false)
    function checkAnswer(isCorrect){
        score = isCorrect? score + 1: score 
    }

    // function addSelectData(obj){
    //     // setSelectedData(prevData =>[...prevData,obj])
    // }
    
    function submit(){
        // console.log("final")
        setIsSubmit(true)
    }
    
    

    React.useEffect(async() =>{
         const res = await fetch("https://opentdb.com/api.php?amount=5")
         const json=await res.json()
         const questionData = json.results
         const questionsList = json.results.map(quest =>{
             return (
                 <div key={Math.floor(Math.random()*10000)}>
                 <p>{quest.question}</p>
                 <div>
                 <Options 
                 incorrect={quest.incorrect_answers} 
                 correct={quest.correct_answer}
                 checkAnswer = {checkAnswer}
                 />
                 </div>
                 <br/><hr/>
                 </div>
             );
         })
         setDisplay(questionsList)
         },[] )
    
    
    return(
        <div>
        {!isSubmit && <h1 className="quiz">Quiz</h1>}
        {!isSubmit && display}
        {!isSubmit && <button onClick={submit} className="submit-button">Submit Test</button>}
         {isSubmit && <div className="submit-page" > 
             <h1>Thanks For Giving Test</h1>
             <h2>Your Score Is {score}/5</h2>
        </div>}
        </div>
    )
}





