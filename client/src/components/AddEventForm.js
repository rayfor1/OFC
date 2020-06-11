import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./EventCard.css";
import "./AddEventForm.css";


class AddEventForm extends Component {
  // Setting the component's initial state
  state = {
    title: "",
    image: "",
    date: "",
    time: "",
    location: "",
    description: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change

    // Updating the input's state

  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
  

    this.setState({
        title: "",
        image: "",
        date: "",
        time: "",
        location: "",
        description: ""
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div >
        <h1>Add Event</h1>
        <form className="form">
          <input
            value={this.state.title}
            name="title"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Event Title"
          />
          <input
            value={this.state.image}
            name="image"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Image URL"
          />
          <input
            value={this.state.date}
            name="date"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Event Date"
          />
                    <input
            value={this.state.time}
            name="time"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Event Start Time"
          />
                    <input
            value={this.state.location}
            name="location"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Event Meet Up Location"
          />
          <input
            value={this.state.description}
            name="description"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Event Description"
          />
            <Link onClick={this.handleFormSubmit} to="/AddEvent" role="button" className="btn btn-lg btn-dark btn-block">Submit</Link>
                 <Link  to={`/AddEvent`} ></Link>
        </form>



 
      </div>
    );
  }
}

export default AddEventForm;
