import { useNavigate } from "react-router-dom";

// *Design Imports*
import "./finalOptions.css";

// *Component Imports*
import FetchButton from "../components/FetchButton";

// *Redux Imports*
import { useSelector, useDispatch } from "react-redux";
import {
  SET_INDEX,
  SET_SCORE,
  SET_QUESTIONS,
  SET_ACCESS,
} from "../redux/optionsSlice";
import { selectFinalScore } from "../redux/selectors";

const FinalOptions = () => {
  const finalScore = useSelector(selectFinalScore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const replay = () => {
    dispatch(SET_INDEX(0));
    dispatch(SET_SCORE(0));
    navigate("/gameStart");
  };

  const reset = () => {
    dispatch(SET_QUESTIONS([]));
    dispatch(SET_INDEX(0));
    dispatch(SET_SCORE(0));
    dispatch(SET_ACCESS(false));
    navigate("/");
  };

  return (
    <>
      <h2>Final Score: {finalScore}%</h2>
      <h3>Start Again?</h3>
      <div>
        <button onClick={() => replay()}>
          <span className="btnTop">Try again</span>
        </button>
        <FetchButton text="Fetch new Questions" />
      </div>
      <button onClick={() => reset()}>
        <span className="btnTop">Back to settings</span>
      </button>
    </>
  );
};

export default FinalOptions;
