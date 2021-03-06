import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import History from "./pages/History";
import EventMain from "./pages/EventMain";
import EventDetail from "./pages/EventDetail";
import AddEvent from "./pages/AddEvent";
import AddCommentForm from "./components/AddCommentForm/AddCommentForm";
import LoginForm from './pages/LoginForm/LoginForm'
import RegisterForm from './pages/RegisterForm/RegisterForm'
import API from './utils/API'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar2 from './components/NavBar/NavBar'
import Jumbotron from './components/Jumbotron/Jumbotron'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    name: "",
    _id: ""
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [eventCount, setEventCount] = useState(0)

  const showMessage = (message, timeout = 3000) => {
    console.log(message)
    setErrorMessage(message)

    if (timeout !== 0) {
      setInterval(() => setErrorMessage(""), timeout);
    }
  }

  useEffect(() => {
    API.isAuthenticated()
      .then(result => setIsAuthenticated(result.data.data))
      .catch(console.error)
  }, [])

//  const location = useLocation()


  const logonUser = event => {
    event.preventDefault()

    const form = event.target
    const credentials = {
      username: form.username.value,
      password: form.password.value
    }

    API.logonUser(credentials)
      .then(result => {
        console.log(result)
        if (result.data.status === 'success') {
          setIsAuthenticated(true)
          setUser(result.data.data)
        } else {
          showMessage(result.data.message)
        }
      })
      .catch(error => {
        console.log(error)
        showMessage(error.message)
      })
  }

  const handleLogout = event => {
    event.preventDefault()

    
    setIsAuthenticated(false)
    setUser("")

  }


  return (
    <Router>
        <Navbar2 isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>

        {/* react router is responding to what the path is */}
        {/* <Switch /> */}
        <Jumbotron />
        <Route exact path="/" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/EventMain" render={props =>
          <EventMain {...props}
            user={user}
            isAuthenticated={isAuthenticated}
            setEventCount={setEventCount} />
        } />
        <Route path="/event/:id"  component={EventDetail} />
        <Route path="/AddEvent" render={props =>
          <AddEvent {...props}
            user={user}
            showMessage={showMessage}
            errorMessage={errorMessage}
            isAuthenticated={isAuthenticated}
            setEventCount={setEventCount} />
        } />
        <Route path="/AddComment" component={AddCommentForm} />

        <Route path="/sign-up" render={props =>
          <RegisterForm {...props}
            errorMessage={errorMessage}
            showMessage={showMessage}
            isAuthenticated={isAuthenticated} />
        } />

        <Route path="/login" render={props =>
          <LoginForm {...props}
            onSubmit={logonUser}
            errorMessage={errorMessage}
            isAuthenticated={isAuthenticated} />
        } />
        {/* <Switch /> */}
        <Footer/>
    </Router>
  );
}

export default App;
