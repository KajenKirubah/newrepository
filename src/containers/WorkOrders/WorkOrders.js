import React, { Component } from "react";
import classes from "./WorkOrders.module.css";
import axios from "axios";
import Order from "../../components/Order/Orders";

class WorkOrders extends Component {
  state = {
    workOrders: null
  };

  componentDidMount() {
    axios
      .get("https://www.hatchways.io/api/assessment/work_orders")
      .then(resp => {
        console.log(resp);
        this.getWorkerData(resp.data.orders);
        this.setState({ workOrders: resp.data.orders });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getWorkerData = orders => {
    const workerLinks = [];

    for (let order of orders) {
      console.log(order);
      workerLinks.push(
        "https://www.hatchways.io/api/assessment/workers/​" + order.workerId
      );
    }

    console.log(workerLinks[0]);

    Promise.all([
      axios.get(workerLinks[0]),
      axios.get("https://www.hatchways.io/api/assessment/workers/2")
    ]).then(resp => {
      console.log(resp);
    });
  };

  render() {
    let workList = null;

    if (this.state.workOrders) {
      console.log(new Date(this.state.workOrders[0].deadline));
      workList = this.state.workOrders.map(order => {
        return (
          <Order
            key={order.id}
            name={order.name}
            description={order.description}
            deadline={new Date(order.deadline).toString()}
          />
        );
      });
    }

    return <div className={classes.WorkOrders}>{workList}</div>;
  }
}

export default WorkOrders;
