import React, { useState, useEffect } from "react";
import axios from "axios";

const Actions = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/actions")
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h3>This is the actions</h3>
    </>
  );
};

export default Actions;
