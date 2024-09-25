import React, { useContext, useState, useEffect } from 'react';
import { store } from "./App";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Myprofile = () => {
  const [token] = useContext(store);  // Get token from context
  const [data, setData] = useState(null);  // Data for profile info
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");  // Redirect if no token
    } else {
      axios.get("http://localhost:8080/myprofile", {
        headers: { 'x-token': token }
      })
        .then(res => setData(res.data))
        .catch((error) => {
          console.log(error);
          alert("Failed to fetch profile data.");
          navigate("/login");
        });
    }
  }, [token, navigate]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <center>
        <h3>Welcome, {data.username}!</h3>
        {/* <p>Email: {data.email}</p> */}
      </center>
    </div>
  );
};

export default Myprofile;
