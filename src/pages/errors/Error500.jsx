import { useNavigate } from "react-router-dom";
import "./errors.css";

const Error500 = () => {
  const navigate = useNavigate();

  return (
    <div className="quizErrorContainer">
      <p>
        <span>Error 500:</span> API request failed.
      </p>
      <button onClick={() => navigate(-1)}>Retry</button>
    </div>
  );
};

export default Error500;
