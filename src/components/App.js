import React, { Component } from "react";

import {
  createTimeEntry,
  fetchTimeEntries,
  removeTimeEntry
} from "../utils/timerUtils";

import Navbar from "./Navbar";
import TimeEntryForm from "./TimeEntryForm";
import TimerHistory from "./TimerHistory";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeEntries: {}
    };

    this.addTimeEntry = this.addTimeEntry.bind(this);
    this.deleteTimeEntry = this.deleteTimeEntry.bind(this);
  }

  componentDidMount() {
    this.retrieveTimeEntries();
  }

  retrieveTimeEntries() {
    const timeEntries = fetchTimeEntries();

    this.setState({ timeEntries });
  }
  deleteTimeEntry(id) {
    removeTimeEntry(id);
    this.retrieveTimeEntries();
  }

  // TODO: reload this from localstorage
  addTimeEntry(entry) {
    createTimeEntry(entry);
    this.retrieveTimeEntries();
  }

  render() {
    const { timeEntries } = this.state;

    return (
      <div>
        <Navbar />
        <TimeEntryForm addTimeEntry={this.addTimeEntry} />
        <TimerHistory
          timeEntries={timeEntries}
          deleteTimeEntry={this.deleteTimeEntry}
        />
      </div>
    );
  }
}
