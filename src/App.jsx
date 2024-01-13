import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Components/Template/Template";
import Home from "./Pages/Home/Home";
import Page2 from "./Pages/Page2/Page2";
import Page3 from "./Pages/Page3/Page3";
import Page4 from "./Pages/Page4/Page4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Home />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
      {/* EX : <Route path="/logement/:logementId" element={<Rental />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
