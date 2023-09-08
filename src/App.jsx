import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Messages from "./pages/messages/Messages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
<>

<BrowserRouter>
<Header/>
  <Routes>
    <Route path='/' exact Component={Home} />
    <Route path="/messages" exact Component={Messages} />
  </Routes>
</BrowserRouter>

</>
  );
}

export default App;
