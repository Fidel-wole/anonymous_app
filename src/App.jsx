import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Messages from "./pages/messages/Messages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Message from "./pages/message/Message";
import SignInPage from "./pages/auth/login/Login";

function App() {
  return (
<>

<BrowserRouter basename={process.env.PUBLIC_URL}> 
<Header/>

  <Routes>
    <Route path='/' exact Component={SignInPage} />
    <Route path='/home' exact Component={Home} />
    <Route path="/messages" exact Component={Messages} />
    <Route path="/message/:id" exact Component={Message} />
  </Routes>
</BrowserRouter>
 
</>
  );
}

export default App;
