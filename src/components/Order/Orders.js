import React from "react";
import classes from "./Order.module.css";

const orders = props => {
  return (
    <div className={classes.Order}>
      <h1>{props.name}</h1>
      <p>Description: {props.description}</p>
      <p>Deadline: {props.deadline}</p>
    </div>
  );
};

export default orders;
