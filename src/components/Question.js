import React from "react"

function Question(props) {

    const answers = props.answers.map(ans => (
        <div
            className="Answer"
            key={ans.id}
            style={{
                backgroundColor:
                    ans.isHeld ? "lightblue"
                    : ans.wrong ? "orange"
                    : ans.right ? "lightgreen"
                    : "white"
        }}
            onClick={() => props.holdAnswer(ans.id, ans.question)}
        >
            {ans.content}
        </div>
    ))


    return(

        <section className="Question">
            <h3 className="Question__ask">
                {props.question}
            </h3>

            <div className="Question__options">
                {answers}
            </div>
        </section>

    )
}

export default Question