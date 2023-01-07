import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FetchButton from "../components/FetchButton";
import {
  SET_INDEX,
  SET_SCORE,
  SET_QUESTIONS,
  SET_ACCESS,
} from "../redux/optionsSlice";
import { selectAccessKey, selectScore } from "../redux/selectors";

const FinalScreen = () => {
  const score = useSelector(selectScore);
  const accessKey = useSelector(selectAccessKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessKey) {
      navigate("/");
      setTimeout(() => {
        alert("You're not allowed on this page yet, sneaky bugger:)");
      }, 1000);
    }
  }, [navigate]);

  const replay = () => {
    dispatch(SET_INDEX(0));
    dispatch(SET_SCORE(0));
    dispatch(SET_ACCESS(false));
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
    <div>
      <h3>Final Score: {score}</h3>
      <h4>Start Again?</h4>
      <div>
        <button onClick={() => replay()}>Try again</button>
        <FetchButton text="Fetch new Questions" />
      </div>
      <button onClick={() => reset()}>Back to settings</button>
    </div>
  );
};

export default FinalScreen;
