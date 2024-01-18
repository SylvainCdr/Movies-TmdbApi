import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Components/Template/Template";
import Movies from "./Pages/Movies/Movies";
import TVSeries from "./Pages/TVSeries/TVSeries";
import People from "./Pages/People/People";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVSeries />} />
          <Route path="/people" element={<People />} />
      {/* EX : <Route path="/logement/:logementId" element={<Rental />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
