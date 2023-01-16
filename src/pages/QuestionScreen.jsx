import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// *Component Import*
import Question from "../components/Question";

// *Redux Imports*
import { useSelector } from "react-redux";
import { selectAccessKey } from "../redux/selectors";

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
  }, [accessKey, navigate]);

  return (
    <>
      <Question />
    </>
  );
};

export default QuestionScreen;
