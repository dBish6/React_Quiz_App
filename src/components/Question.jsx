import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// *Design Imports*
import { MdArrowBack } from "react-icons/md";
import "./question.css";

// *Redux Imports*
import { useSelector, useDispatch } from "react-redux";
import {
  SET_QUESTIONS,
  SET_INDEX,
  SET_SCORE,
  SET_ACCESS,
} from "../redux/optionsSlice";
import {
  selectLoading,
  selectQuestions,
  selectIndex,
  selectScore,
} from "../redux/selectors";

// Utility Import
import DecodeHTML from "../utils/DecodeHtml";

const Question = () => {
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(null);
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(null);
  const [questionLoading, toggleQuestionLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const [disabled, toggleDisabled] = useState(false);

  const loading = useSelector(selectLoading);
  const questionIndex = useSelector(selectIndex);
  const score = useSelector(selectScore);
  const encodedQuestions = useSelector(selectQuestions);

  const navigate = useNavigate();
  const questionRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    toggleQuestionLoading(true);
    // Decodes questions sent from API to keep the questions coming.
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: DecodeHTML(q.question),
        correct_answer: DecodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => DecodeHTML(a)),
      };
    });
    toggleQuestionLoading(false);
    if (!questionLoading) {
      setQuestions(decodedQuestions);
    }
  }, [encodedQuestions]);

  // Current question & correct answer.
  const question = questions[questionIndex];
  // console.log(question);
  const answer = question && question.correct_answer;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (!question) {
      return;
    }

    let answers = [...question.incorrect_answers];
    // console.log("before " + answers);
    // Adds the correct_answer to the answers array in random position.
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );
    // console.log("after " + answers);

    setOptions(answers);
    setCurrentQuestion(question.question);
    // console.log(options);
  }, [question]);

  const handleListItemClick = (event) => {
    toggleDisabled(true);
    setAnswerSelected(event.target.textContent);
    // If the given answer is correct.
    if (event.target.textContent === answer) {
      setSelectedCorrectAnswer(event.target.textContent);
      dispatch(SET_SCORE(score + 1));
    }
    // If it is not the final question, move on the the next one.
    if (questionIndex + 1 < questions.length) {
      setTimeout(() => {
        toggleDisabled(false);
        setAnswerSelected(null);
        setSelectedCorrectAnswer(null);
        dispatch(SET_INDEX(questionIndex + 1));
      }, 2200);
    } else {
      setTimeout(() => {
        toggleDisabled(false);
        navigate("/gameEnd");
      }, 2200);
    }
  };

  const reset = () => {
    dispatch(SET_QUESTIONS([]));
    dispatch(SET_INDEX(0));
    dispatch(SET_SCORE(0));
    dispatch(SET_ACCESS(false));
  };

  return (
    <>
      {questionLoading || loading ? (
        <p className="questionLoader">Loading Questions...</p>
      ) : (
        <div
          className={
            disabled ? "questionContainer" : "questionContainer animate"
          }
        >
          <Link to="/" className="arrowBack" onClick={() => reset()}>
            <MdArrowBack />
          </Link>
          <h1>Question {questionIndex + 1}</h1>
          <h3>{currentQuestion}</h3>
          <ul>
            {options.map((option, i) => (
              <li
                key={i}
                className={
                  option === selectedCorrectAnswer
                    ? "question correct"
                    : option === answerSelected
                    ? "question incorrect"
                    : disabled
                    ? "question disable"
                    : "question"
                }
                ref={questionRef}
                onClick={(e) => handleListItemClick(e)}
              >
                {option}
              </li>
            ))}
          </ul>
          <div className="scoreContainer">
            <p>
              Score: {score} / {questions.length}
            </p>
            <a
              href="https://opentdb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              opentdb.com
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
