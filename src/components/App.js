import React from "react";
import Preface from "./Preface";
import Action from "./Action";
import { nanoid } from "nanoid";

function App() {
  const [begin, setBegin] = React.useState(false);
  const [apiData, setApiData] = React.useState("");
  const [questions, setQuestions] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => setApiData(data.results));
  }, []);

  function setAnswers(correctAns, wrongAns, question) {
    const random = Math.floor(Math.random() * 4);

    wrongAns.splice(random, 0, correctAns);

    return wrongAns.map((ans) => ({
      content: ans,
      id: nanoid(),
      isHeld: false,
      question: question,
      wrong: false,
      right: false
    }));
  }

  function beginGame() {
    setBegin(true);
    setQuestions(translateApiData());
  }

  function translateApiData() {
    return apiData.map((item) => ({
      id: nanoid(),
      question: item.question,
      correct: item.correct_answer,
      answers: setAnswers(
        item.correct_answer,
        item.incorrect_answers,
        item.question
      )
    }));
  }

  function holdAnswer(id, ask) {
    setQuestions((prevState) =>
      prevState.map((question) => {
        if (question.question !== ask) {
          return question;
        } else {
          const answersHeld = question.answers.map((answer) =>
            answer.id === id
              ? { ...answer, isHeld: !answer.isHeld }
              : { ...answer, isHeld: false }
          );

          return { ...question, answers: answersHeld };
        }
      })
    );
  }

  function checkAnswers() {
    setQuestions((prevState) =>
      prevState.map((item) => {
        const answersChecked = item.answers.map((ans) => {
          if (ans.content === item.correct && ans.isHeld) {
            setCounter((prevState) => prevState + 1);
            return { ...ans, right: true, isHeld: false };
          } else if (ans.content !== item.correct && ans.isHeld) {
            return { ...ans, wrong: true, isHeld: false };
          } else if (ans.content === item.correct && !ans.isHeld) {
            return { ...ans, right: true };
          } else {
            return ans;
          }
        });

        return { ...item, answers: answersChecked };
      })
    );

    setChecked(true);
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => setApiData(data.results))
      .catch((err) => console.log(err));
  }

  function playAgain() {
    setBegin(false);
    setApiData("");
    setQuestions("");
    setCounter(0);
    setChecked(false);

    if (apiData) {
      beginGame();
    }
  }

  return (
    <main className="app">
      {begin ? (
        <Action
          questions={questions}
          holdAnswer={holdAnswer}
          checkAnswers={checkAnswers}
          checked={checked}
          counter={counter}
          playAgain={playAgain}
        />
      ) : (
        <Preface beginGame={beginGame} apiData={apiData} />
      )}
    </main>
  );
}

export default App;
