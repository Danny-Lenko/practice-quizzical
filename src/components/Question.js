import React from "react";
import { decode } from "html-entities";

function Question(props) {
  const answers = props.answers.map((ans) => (
    <div
      className="answer"
      key={ans.id}
      style={{
        backgroundColor: ans.isHeld
          ? "#D6DBF5"
          : ans.wrong
          ? "#F8BCBC"
          : ans.right
          ? "#94D7A2"
          : "white"
      }}
      onClick={() => props.holdAnswer(ans.id, ans.question)}
    >
      {decode(ans.content)}
    </div>
  ));

  return (
    <section className="question">
      <h3 className="question__ask">{decode(props.question)}</h3>

      <div className="question__options">{answers}</div>
    </section>
  );
}

export default Question;
