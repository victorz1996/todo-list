import React from "react";
import "./CreateTodoBtn.css"

function CreateTodoBtn(){
    const onClickButton = (msg)=>{
        alert(msg)
    }
    return(
        <button className="CreateTodoButton" onClick={()=> onClickButton("click")}>+</button>
    )
}
export {CreateTodoBtn};