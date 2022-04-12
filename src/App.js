import React from "react"
import FirstPage from "./FirstPage"
import Quiz from "./Quiz"


export default function App(){
    
    const [start,setStart]=React.useState(false)
console.log(start)
    function controlStart(){ setStart(true) } 

    return (
        <div>
        {!start && <FirstPage controlStart={controlStart} />}
        {(start) && <Quiz key={Math.random()}/>}
        </div>
    
    )
}