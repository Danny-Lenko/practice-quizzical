import React from "react";
import Question from "./Question"

function Action(props) {



    return(

        <div className="Action">
            <Question
                question={props.questions[0].question}
                answers={props.questions[0].answers}
                holdAnswer={props.holdAnswer}
            />

            <button
                className="Action__btn"
            >
                Check Answers
            </button>

        </div>
    )
}

export default Action