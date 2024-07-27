// client/src/Update.jsx

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();

  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/events/${id}`)
      .then((response) => {
        setEvent(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        alert("Error fetching event:", error);
      });
  }, [id]);

  const [updatedTitle, setUpdatedTitle] = useState(event ? event.title : "");
  const [updatedDescription, setUpdatedDescription] = useState(
    event ? event.description : ""
  );
  const [updatedLocation, setUpdatedLocation] = useState(
    event ? event.location : ""
  );
  const [updatedDate, setUpdatedDate] = useState(event ? event.dat : "");

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedEvent = {
      title: updatedTitle,
      description: updatedDescription,
      location: updatedLocation,
      date: updatedDate,
    };

    axios
      .put(`http://localhost:8080/events/${id}`, updatedEvent)
      .then(() => {
        // Handle successful update
        alert("Event updated successfully!");
      })
      .catch((error) => {
        // Handle error
        alert("Error updating event:", error);
      });
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container my-2">
          <h4>GFG Event</h4>
          <Link className="btn btn-primary ml-auto" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </nav>
      <div className="row my-3">
        <div className="col-lg-4">
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="inputAddress">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="inputAddress"
                  placeholder="Event Title"
                  defaultValue={event.title}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="inputAddress2">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  id="inputAddress2"
                  placeholder="Enter Description"
                  defaultValue={event.description}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="inputAddress2">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  id="inputAddress2"
                  placeholder="Enter Location"
                  defaultValue={event.location}
                  onChange={(e) => setUpdatedLocation(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="inputAddress2">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="inputAddress2"
                  placeholder="Enter Date"
                  defaultValue={event.date}
                  onChange={(e) => setUpdatedDate(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Update;
