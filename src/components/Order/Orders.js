import React from "react";
import classes from "./Order.module.css";
import Worker from "../Worker/Worker";

const orders = props => {
  
  return (
    <div className={classes.Order}>
      <h1>{props.name}</h1>
      <p>Description: {props.description}</p>
      <p>Deadline: {props.deadline}</p>
      <Worker
        name={props.worker.name}
        company={props.worker.companyName}
        email={props.worker.email}
      />
    </div>
  );
};

export default orders;
