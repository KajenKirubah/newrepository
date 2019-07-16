import React, { Component } from "react";
import classes from "./WorkOrders.module.css";
import axios from "axios";
import Order from "../../components/Order/Orders";
import Aux from "../../hoc/Auxilliary/Auxilliary";

class WorkOrders extends Component {
  state = {
    workOrders: null,
    workers: null,
    search: ""
  };

  componentDidMount() {
    axios
      .get("https://www.hatchways.io/api/assessment/work_orders")
      .then(resp => {
        this.getWorkerData(resp.data.orders);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getWorkerData = orders => {
    const workerIds = orders
      .map(order => {
        return order.workerId;
      })
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    const promises = [];

    for (let i = 0; i < workerIds.length; i++) {
      promises.push(
        axios.get(
          "https://www.hatchways.io/api/assessment/workers/" + workerIds[i]
        )
      );
    }

    Promise.all(promises).then(resp => {
      const workers = [];
      const testOrders = [];

      for (let worker of resp) {

        workers.push({
          ...worker.data.worker
        });

        const updatedOrders = orders
          .filter(order => {
            return order.workerId == worker.data.worker.id;
          })
          .map(ord => {
            return {
              ...ord,
              name: worker.data.worker.name
            };
          });

        testOrders.push(updatedOrders); 
      }

      const workOrders = testOrders.reduce((arr, el) => {
        return arr.concat(el);
      }, []);

      this.setState({ workers, workOrders });
    });
  };

  inputChangedHandler = e => {
    this.setState({ search: e.target.value });
  };

  sortChangedHandler = e => {
    const sortedOrders = [...this.state.workOrders];

    if (e.target.value === "latest") {
      sortedOrders.sort((orderB, orderA) => {
        return new Date(orderA.deadline) - new Date(orderB.deadline);
      });
    } else if (e.target.value === "earliest") {
      sortedOrders.sort((orderA, orderB) => {
        return new Date(orderA.deadline) - new Date(orderB.deadline);
      });
    }

    this.setState({
      workOrders: sortedOrders
    });
  };

  render() {
    let workList = null;

    if (this.state.workOrders && this.state.workers) {
      const filteredByWorkers = this.state.workOrders.filter(order => {
        return (
          order.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        );
      });

      if (filteredByWorkers.length <= 0) {
        workList = <h2>Worker does not exist!</h2>;
      } else {
        workList = filteredByWorkers.map(order => {
          return (
            <Order
              key={order.id}
              name={order.name}
              description={order.description}
              deadline={new Date(order.deadline).toString()}
              worker={
                this.state.workers.filter(
                  worker => worker.id === order.workerId
                )[0]
              }
            />
          );
        });
      }
    }

    return (
      <Aux>
        <form>
          <input
            type="text"
            placeholder="enter worker name"
            value={this.state.search}
            onChange={this.inputChangedHandler}
          />
          <button>Search</button>
        </form>
        <div>
          {" "}
          <label>Sort By: </label>
          <select onChange={this.sortChangedHandler}>
            <option
              value="default"
              selected
              disabled
              style={{ display: "none" }}
            >
              Default
            </option>
            <option value="earliest">Earliest</option>
            <option value="latest">Latest</option>
          </select>
        </div>

        <div className={classes.WorkOrders}>{workList}</div>
      </Aux>
    );
  }
}

export default WorkOrders;
