import { useState, useEffect } from 'react';
import React from 'react';

import Box from './Box';
import Cookies from 'js-cookie';



function Boxes() {
  const [boxes, setBoxes] = useState([]);
  const [logs, setLogs] = useState([]);
  const neke = Cookies.get("uporabnik");

  function getBoxes() {
    //var neke = Cookies.get("uporabnik")
    console.log(neke)
    fetch(`http://localhost:3001/box/my_boxes/${neke}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check the fetched data in the console
        setBoxes(data);
        return data
      })
      .catch((err) => {
        console.log("juhu");
        console.log(err);
      });
  }
  
  function getLogs() {
    //var neke = Cookies.get("uporabnik")
    console.log(neke)
    fetch(`http://localhost:3001/log/my_logs/${neke}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("LOGS: "+data); // Check the fetched data in the console
        setLogs(data);
        return data
      })
      .catch((err) => {
        console.log("juhu");
        console.log(err);
      });
  }
  

  useEffect(() => {
    getBoxes();
    //setBoxes(data)
  }, [neke]);

  useEffect(() => {
    getLogs();
    //setBoxes(data)
  }, [neke]);

  return (
    <div>
    <h3>Boxes:</h3>
    <ul>
      {boxes.length > 0 ? (
        boxes.map((box) => (
          <React.Fragment key={box._id}>
            <Box box={box.name} box_id={box._id} boxId={box.boxId}></Box>
            <br />
          </React.Fragment>
        ))
      ) : (
        <p>No boxes found.</p>
      )}
    </ul>
  </div>
  
  );
}

export default Boxes;
