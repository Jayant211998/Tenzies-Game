import React from "react"


let score = 0 
export default function Quiz(props){
    const [questionData,setQuestionData] = React.useState([])
    const [isSubmit,setIsSubmit] = React.useState(false)
    const [ansShown,setAnsShown] =React.useState(false)
    const [disabled,setDisabled] =React.useState(false)
    

React.useEffect(async() =>{
         const res = await fetch("https://opentdb.com/api.php?amount=5")
         const json=await res.json()
         const data = json.results;
         setQuestionData(prev=>{
             for(let i=0;i<5;i++){
                data[i]={...data[i],
                    id:i,
                    score:0,
                    selectedAns:"",
                    allOptions:[...data[i].incorrect_answers,data[i].correct_answer]
                }
                for (let k = data[i].allOptions.length - 1; k > 0; k--) {
                    let j = Math.floor(Math.random() * (k + 1));
                    let temp = data[i].allOptions[k];
                    data[i].allOptions[k] = data[i].allOptions[j];
                    data[i].allOptions[j] = temp;
                }
                data[i].allOptions = data[i].allOptions.map(opt=>{return {value: opt,btnColor:"grey"}})
             }
             return data
         })
         },[] )
// console.log(questionData)


    function checkAnswer(){
        setAnsShown(true)
        setDisabled(true)
        questionData.forEach(question=>{
            if(question.selectedAns===question.correct_answer){
                score+=1
            }
        })

        setQuestionData(question=>{
            let data = question;
            data = data.map(q=>{
               return {...q,allOptions:q.allOptions.map(opt=>opt.value===q.selectedAns?{...opt,btnColor:"red"}:{...opt})}
            })
            data = data.map(q=>{
                return {...q,allOptions:q.allOptions.map(opt=>opt.value===q.correct_answer?{...opt,btnColor:"green"}:{...opt})}
             })
            return data
        })
    } 
    function submit(){
        setIsSubmit(true)
    }
    function handelClick(e,quest,ans){
        setQuestionData(question=>{
            let data = question;
            data=data.map(q =>{
                return q.id===quest.id?{...q,selectedAns:ans.value}:{...q}
            })
            data = data.map(q=>{
               return q.id===quest.id?{...q,allOptions:q.allOptions.map(opt=>opt.value===q.selectedAns?{...opt,btnColor:"blue"}:{...opt,btnColor:"grey"})}:{...q}
            })
            return data
        })
    }

    const questionsList = questionData.map(quest =>{
        const optionList = quest.allOptions.map(ans => {
            return (
                <button className="option-button"
                    style = {{backgroundColor: ans.btnColor}}
                    key={Math.floor(Math.random()*10000)}
                    disabled = {disabled }
                    onClick={(e) => handelClick(e,quest,ans)}
                    >
                    {ans.value}
                </button>
            )
        });
        return (
            <div key={Math.floor(Math.random()*10000)}>
            <p>{quest.question.replace(/&quot;/g, '\"')}</p>
            {optionList}
            <br/><hr/>
            </div>
        );
    })
    

    
    
    
    return(
        <div>
        {!isSubmit && <h1 className="quiz">Quiz</h1>}
        {!isSubmit && questionsList}
        {!isSubmit && !ansShown && <button onClick={checkAnswer} className="submit-button">Submit Test</button>}
        {!isSubmit && ansShown && <button onClick={submit} className="submit-button">Get Score</button>}
         {isSubmit && <div className="submit-page" > 
             <h1>Thanks For Giving Test</h1>
             <h2>Your Score Is {score}/5</h2>
             <button type="button"  className="submit-button" onClick={()=>{ window.location.reload(true);}}>Submit</button>
        </div>}
        </div>
    )
}





