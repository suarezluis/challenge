import React, { Component } from "react";

import {
  createTimeEntry,
  fetchTimeEntries,
  removeTimeEntry,
  extractIncompleteEntry
} from "../utils/timerUtils";

import Navbar from "./Navbar";
import TimeEntryForm from "./TimeEntryForm";
import TimerHistory from "./TimerHistory";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeEntries: {},
      incompleteEntry: extractIncompleteEntry()
    };

    this.addTimeEntry = this.addTimeEntry.bind(this);
    this.deleteTimeEntry = this.deleteTimeEntry.bind(this);
    this.retrieveTimeEntries = this.retrieveTimeEntries.bind(this);
    this.removeIncompleteEntry = this.removeIncompleteEntry.bind(this);
  }

  componentDidMount() {
    this.retrieveTimeEntries();
  }

  removeIncompleteEntry() {
    this.setState({ incompleteEntry: false });
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
        <TimeEntryForm
          addTimeEntry={this.addTimeEntry}
          incompleteEntry={this.state.incompleteEntry}
          retrieveTimeEntries={this.retrieveTimeEntries}
          removeIncompleteEntry={this.removeIncompleteEntry}
        />

        <TimerHistory
          timeEntries={timeEntries}
          deleteTimeEntry={this.deleteTimeEntry}
        />
      </div>
    );
  }
}
