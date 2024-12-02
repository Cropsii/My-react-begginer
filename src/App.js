import React, { useState } from "react";
import "./index.scss";
import { clear } from "@testing-library/user-event/dist/clear";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];
function Result({ Back, cor, Clear }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>{`Вы отгадали ${cor} ответа из ${questions.length}`}</h2>
      <button
        onClick={() => {
          Back();
          Clear();
        }}
      >
        Попробовать снова
      </button>
    </div>
  );
}

function Game({ question, HandleStep, step, questions, corAdd, cor }) {
  function ProsCount(step, questions) {
    return (step / questions.length) * 100;
  }
  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${ProsCount(step, questions)}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, id) => (
          <li
            key={id}
            onClick={() => {
              HandleStep(step);
              corAdd(id, question.correct, cor);
            }}
          >
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [cor, setCor] = useState(0);
  const [step, setStep] = useState(0);
  const question = questions[step];
  function corAdd(index, correct, cor) {
    if (index == correct) {
      setCor(cor + 1);
    }
  }
  function HandleStep(step) {
    return setStep(step + 1);
  }
  function Back() {
    return setStep(0);
  }
  function Clear() {
    return setCor(0);
  }
  console.log(question);
  return (
    <div className="App">
      {step == questions.length ? (
        <Result Back={Back} cor={cor} Clear={Clear}></Result>
      ) : (
        <Game
          cor={cor}
          corAdd={corAdd}
          question={question}
          step={step}
          HandleStep={HandleStep}
          questions={questions}
        />
      )}
    </div>
  );
}

export default App;
