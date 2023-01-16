/* Quiz App

   Author: David Bishop
   Creation Date: November, 2022
   Styled: January, 2023
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

// *Pages/Views*
import StartScreen from "./pages/StartScreen";
import QuestionScreen from "./pages/QuestionScreen";
import FinalScreen from "./pages/FinalScreen";
import Footer from "./components/partials/Footer";

import Error500 from "./pages/errors/Error500";
import Error404 from "./pages/errors/Error404";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/gameStart" element={<QuestionScreen />} />
          <Route path="/gameEnd" element={<FinalScreen />} />

          <Route path="/error500" element={<Error500 />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="*" element={<Error404 title="ERROR" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
