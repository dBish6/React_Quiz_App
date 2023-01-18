import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// *Component Import*
import FetchButton from "./FetchButton";

// *Redux Imports*
import { useSelector, useDispatch } from "react-redux";
import { selectLoading, selectAmount } from "../redux/selectors";
import {
  CHANGE_LOADING,
  CHANGE_AMOUNT,
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_TYPE,
} from "../redux/optionsSlice";
import "./settings.css";

const Settings = () => {
  const [options, setOptions] = useState(null);
  const [amountErr, setAmountErr] = useState("");
  // Allows to extract data from the Redux store.
  const loading = useSelector(selectLoading);
  const questionAmount = useSelector(selectAmount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoadingChange = (boolean) => {
    dispatch(CHANGE_LOADING(boolean));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        handleLoadingChange(true);
        // Fetches question categories from https://opentdb.com/.
        const res = await axios({
          method: "GET",
          url: "https://opentdb.com/api_category.php",
        });
        // console.log(res.data);

        handleLoadingChange(false);
        if (!loading && res.status === 200) {
          setOptions(res.data.trivia_categories);
        }
      } catch (error) {
        console.error(error);
        navigate("/error500");
      }
    };
    fetchQuestions();
  }, [setOptions]);
  // console.log(options);

  const handleCategoryChange = (event) => {
    // Reducer method passing in payload.
    dispatch(CHANGE_CATEGORY(event.target.value));
  };

  const handleDifficultyChange = (event) => {
    dispatch(CHANGE_DIFFICULTY(event.target.value));
  };

  const handleTypeChange = (event) => {
    dispatch(CHANGE_TYPE(event.target.value));
  };

  const handleAmountChange = (event) => {
    event.target.value > 50
      ? setAmountErr("The question limit is 50.")
      : setAmountErr("");
    dispatch(CHANGE_AMOUNT(event.target.value));
  };

  return (
    <>
      {loading ? (
        <p className="questionLoader">Loading...</p>
      ) : (
        <div className="startContainer">
          <h1>Redux Quiz App</h1>
          <small>
            Via{" "}
            <a
              href="https://opentdb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Trivia DB
            </a>{" "}
            API
          </small>
          <small className="getStartedTxt">
            Please set your desired options to get started.
          </small>

          <div className="optionsContainer">
            <div>
              <h2>Category:</h2>
              <select
                onChange={(e) => {
                  handleCategoryChange(e);
                }}
              >
                <option>All</option>
                {options &&
                  options.map((option) => (
                    <option value={option.id} key={option.id}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <h2>Select Difficulty:</h2>
              <select onChange={(e) => handleDifficultyChange(e)}>
                <option value="" key="difficulty-0">
                  All
                </option>
                <option value="easy" key="difficulty-1">
                  Easy
                </option>
                <option value="medium" key="difficulty-2">
                  Medium
                </option>
                <option value="hard" key="difficulty-3">
                  Hard
                </option>
              </select>
            </div>
            <div>
              <h2>Select Question Type:</h2>
              <select onChange={(e) => handleTypeChange(e)}>
                <option value="" key="type-0">
                  All
                </option>
                <option value="multiple" key="type-1">
                  Multiple Choice
                </option>
                <option value="boolean" key="type-2">
                  True/False
                </option>
              </select>
            </div>
            <div>
              <h2 id="amount">Amount of Questions:</h2>
              <input
                value={questionAmount}
                onChange={(e) => handleAmountChange(e)}
              />
              {amountErr.length ? (
                <small className="errorTxt">{amountErr}</small>
              ) : undefined}
            </div>

            <FetchButton text="Start Quiz" />
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
