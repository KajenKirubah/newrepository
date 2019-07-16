import React from "react";
import classes from "./Worker.module.css";

const worker = props => {
  const dt = new Date();

  return (
    <div>
      <div className={classes.Worker}>
        <div className={classes.Image} />
        <div className={classes.WorkerDetails}>
          <p>{props.name}</p>
          <p>{props.company}</p>
          <p>{props.email}</p>
        </div>
      </div>
      <div style={{ width: "fit-content", marginLeft: "auto" }}>
        {dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()}
      </div>
    </div>
  );
};

export default worker;
