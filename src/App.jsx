import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Components/Template/Template";
import Home from "./Pages/Home/Home";
import TVSeries from "./Pages/TVSeries/TVSeries";
import People from "./Pages/People/People";
import Page4 from "./Pages/Page4/Page4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<TVSeries />} />
          <Route path="/people" element={<People />} />
          <Route path="/page4" element={<Page4 />} />
      {/* EX : <Route path="/logement/:logementId" element={<Rental />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
