import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAccessKey } from "../redux/selectors";

import Question from "../components/Question";

const QuestionScreen = () => {
  const accessKey = useSelector(selectAccessKey);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessKey) {
      navigate("/");
      setTimeout(() => {
        alert("You're not allowed on this page yet, sneaky bugger:)");
      }, 1000);
    }
  }, [navigate]);

  return (
    <div className="questionContainer">
      <Question />
    </div>
  );
};

export default QuestionScreen;
