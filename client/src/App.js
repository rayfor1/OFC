import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Home from "./pages/Home";
import History from "./pages/History";
import EventMain from "./pages/EventMain";
import EventDetail from "./pages/EventDetail";
import AddEvent from "./pages/AddEvent";
import AddComment from "./pages/AddComment";
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import API from './utils/API'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    name: "",
    _id: ""
  })
  const [errorMessage, setErrorMessage] = useState("")

  const showMessage = (message, timeout = 3000) => {
    setErrorMessage(message)

    if (timeout !== 0){
      setInterval(() => setErrorMessage(""), timeout);
    }
  }

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
      .catch(console.error)
  }

  const registerUser = event => {
    event.preventDefault()

    const form = event.target
    const credentials = {
      username: form.username.value,
      password: form.password.value
    }

    API.registerUser(credentials)
      .then(result => {
        console.log(result)
        if (result.data.status === 'success') {
          setIsAuthenticated(true)
          setUser(result.data.data)
        } else {
          showMessage(result.data.message)
        }
      })
      .catch(console.error)
  }


  const handleLogout = event => {
    event.preventDefault()

    setIsAuthenticated(false)
    setUser("")

  }

  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {/* Nav bar tabs first */}
        <NavTabs isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        {/* react router is responding to what the path is */}
        <Route exact path="/" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/EventMain" component={EventMain}/>
        <Route path="/EventDetail" component={EventDetail}/>
        <Route path="/AddEvent" component={AddEvent}/>
        <Route path="/AddComment" component={AddComment}/>
        <Route path="/sign-up" render={props =>
          <RegisterForm {...props}
            onSubmit={registerUser}
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
      </div>
    </Router>
  );
}

export default App;
