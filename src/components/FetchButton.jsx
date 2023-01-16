import { useNavigate } from "react-router-dom";

// *Redux Imports*
import { useSelector, useDispatch } from "react-redux";
import {
  CHANGE_LOADING,
  SET_QUESTIONS,
  SET_ACCESS,
  SET_INDEX,
  SET_SCORE,
} from "../redux/optionsSlice";
import {
  selectCategory,
  selectDifficulty,
  selectType,
  selectAmount,
} from "../redux/selectors";

const FetchButton = (props) => {
  // Allows to extract data from the Redux store.
  const questionCategory = useSelector(selectCategory);
  const questionDifficulty = useSelector(selectDifficulty);
  const questionType = useSelector(selectType);
  const questionAmount = useSelector(selectAmount);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setLoading = (boolean) => {
    dispatch(CHANGE_LOADING(boolean));
  };

  const setQuestions = (data) => {
    dispatch(SET_QUESTIONS(data));
  };

  const handleQuery = async () => {
    // Specifies the number of questions that we want.
    let apiURL = `https://opentdb.com/api.php?amount=${questionAmount}`;
    // Only add the rest of the parameters if they aren't "all".
    if (questionCategory.length) {
      apiURL = apiURL.concat(`&category=${questionCategory}`);
    }
    if (questionDifficulty.length) {
      apiURL = apiURL.concat(`&difficulty=${questionDifficulty}`);
    }
    if (questionType.length) {
      apiURL = apiURL.concat(`&type=${questionType}`);
    }
    try {
      setLoading(true);
      dispatch(SET_ACCESS(true));
      // console.log(apiURL);
      const res = await fetch(apiURL);
      const jsonData = await res.json();
      // console.log(jsonData.results);

      setQuestions(jsonData.results);
      // Resets everything when fetch button is pressed.
      dispatch(SET_INDEX(0));
      dispatch(SET_SCORE(0));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="submit"
      onClick={() => {
        handleQuery();
        navigate("/gameStart");
      }}
    >
      <span className="btnTop">{props.text}</span>
    </button>
  );
};

export default FetchButton;
