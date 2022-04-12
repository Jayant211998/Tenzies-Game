import React from "react"


export default function Options(props){    
    // console.log(props.correct)
    let i=0
     let answers=[...props.incorrect]
    answers.splice(Math.floor(Math.random()*(answers.length)+1),0,props.correct)
    answers = answers.map(ans => {
        return {id : i++,
                value: ans ,
                isCorrect: ans===props.correct,
                enable: true,
                selected: false 
                }
    })
    const [option ,setOption] = React.useState(answers);
     const optionList = option.map(ans => {
         let color="grey"
         if(!ans.enable && ans.isCorrect)color="green"
        //  if(!ans.enable && !ans.isCorrect)color="red"
         if(ans.selected && !ans.isCorrect)color="red"
         
        return (
            <button className="option-button"
                style = {                     
                    {
                    backgroundColor: color
                    }
                }
                key={Math.floor(Math.random()*10000)}
                disabled = {!ans.enable }
                onClick={() => handelClick(ans)}
                >
                {ans.value}
            </button>
        )
    });
    
        const [optionDisplay, setOptionDisplay] = React.useState(optionList)
        

    
     function handelClick(ans){
        setOption(answerList => {
            const myans = answerList.map(answer => {
                return answer.id===ans.id
                    ?{...answer,selected:true,enable:false}
                    :{...answer,enable:false}
            })
            // props.addSelectData(myans)
            return myans
        })
        props.checkAnswer(ans.isCorrect)
    }
      
    return(
        <div>
           {optionList} 
        </div>
    )
}