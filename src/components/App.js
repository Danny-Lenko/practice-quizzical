import React from "react";
import Preface from "./Preface"
import Action from "./Action"
import { nanoid } from 'nanoid'

function App() {

    const [begin, setBegin] = React.useState(false)
    const [apiData, setApiData] = React.useState('')
    const [questions, setQuestions] = React.useState('')

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => setApiData(data.results))
    }, [])

    function setAnswers(correctAns, wrongAns, question) {
        const random = Math.floor(Math.random() * 4)

        wrongAns.splice(random, 0, correctAns)
        return wrongAns.map(ans => ({
            content: ans,
            id: nanoid(),
            isHeld: false,
            question: question
        }))
    }

    console.log(questions)

    function beginGame() {
        setBegin(true)
        setQuestions(
            apiData.map(item => ({
                id: nanoid(),
                question: item.question,
                correct: item.correct_answer,
                answers: setAnswers(
                    item.correct_answer,
                    item.incorrect_answers,
                    item.question
                )
            }))
        )
    }

    function holdAnswer(id, ask) {
        setQuestions(prevState => prevState.map(question => {

            if (question.question !== ask) {

                return question

            } else {

                const answersHeld = question.answers.map(answer => (
                    answer.id === id
                        ? {...answer, isHeld: !answer.isHeld}
                        : {...answer, isHeld: false}
                ))

                return {...question, answers: answersHeld}

            }

        } ))
    }


    return(

        <main className="App">

            {
                begin

                    ? <Action
                        questions={questions}
                        holdAnswer={holdAnswer}
                    />

                    : <Preface
                        beginGame={beginGame}
                        apiData={apiData}
                    />
            }

        </main>

    )
}

export default App




    // React.useEffect(() => {
    //     setQuestions(
    //         apiData.map(item => ({
    //             id: nanoid(),
    //             question: item.question,
    //             correct: item.correct_answer,
    //             wrong: setAnswers(item.correct_answer, item.incorrect_answers)
    //         }))
    //     )
    // }, [apiData])
