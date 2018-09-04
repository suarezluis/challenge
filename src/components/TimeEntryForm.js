import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  updateTimeEntry,
  removeTimeEntry,
  createTimeEntry,
  removeIncompleteEntries
} from "../utils/timerUtils";

import Task from "./Task";
import Billable from "./Billable";
import ProjectSelect from "./ProjectSelect";
import CategorySelect from "./CategorySelect";
import Timer from "./Timer";

const defaultState = {
  description: "",
  selectedProject: "",
  selectedCategories: [],
  billable: false,
  startTime: "",
  endTime: ""
};

export default class TimeEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.setDescription = this.setDescription.bind(this);
    this.setBillable = this.setBillable.bind(this);
    this.setSelectedProject = this.setSelectedProject.bind(this);
    this.setSelectedCategories = this.setSelectedCategories.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
    this.setBothTimes = this.setBothTimes.bind(this);
  }

  setDescription(description) {
    this.setState({ description });
  }

  setBillable() {
    this.setState(prevState => ({ billable: !prevState.billable }));
  }

  setSelectedProject(updatedSelectedProject) {
    // react-select library turns selectedProject into an array if you remove a selectedProject
    // eslint-disable-next-line no-underscore-dangle
    const selectedProject = Array.isArray(updatedSelectedProject)
      ? ""
      : updatedSelectedProject._id;
    this.setState({ selectedProject });
  }

  setSelectedCategories(selectedCategories) {
    this.setState({ selectedCategories });
  }

  setStartTime(startTime) {
    this.setState({ startTime }, () => this.saveIncompleteEntry());
  }

  setEndTime(endTime) {
    this.setState({ endTime }, () => this.saveTimeEntry());
  }

  setBothTimes(startTime, endTime) {
    this.setState({ startTime, endTime }, () => this.saveTimeEntry());
  }
  saveIncompleteEntry() {
    const {
      billable,
      selectedCategories,
      description,
      selectedProject,
      startTime,
      endTime
    } = this.state;
    const { addTimeEntry } = this.props;
    createTimeEntry({
      billable,
      categories: selectedCategories,
      description,
      selectedProject,
      endTime,
      startTime
    });
  }

  saveTimeEntry() {
    const {
      billable,
      selectedCategories,
      description,
      selectedProject,
      startTime,
      endTime
    } = this.state;
    const { addTimeEntry } = this.props;

    if (this.props.incompleteEntry) {
      const { incompleteEntry } = this.props;
      const id = Object.keys(incompleteEntry)[0];
      updateTimeEntry(id, this.state);
      this.props.removeIncompleteEntry();
      this.props.retrieveTimeEntries();
    } else {
      addTimeEntry({
        billable,
        categories: selectedCategories,
        description,
        selectedProject,
        endTime,
        startTime
      });
      removeIncompleteEntries();
    }
    this.resetForm();
  }

  resetForm() {
    this.setState(defaultState);
  }

  render() {
    const {
      billable,
      selectedCategories,
      selectedProject,
      startTime
    } = this.state;
    const isIncompleteEntry = !!this.props.incompleteEntry;

    return (
      <div className="mw100 center bg-white br3 h3 pa3 mv3 ba b--black-10 flex justify-between items-center">
        <Task
          setDescription={this.setDescription}
          description={this.state.description}
        />

        <ProjectSelect
          setSelectedProject={this.setSelectedProject}
          selectedProject={selectedProject}
        />

        <CategorySelect
          selectedCategories={selectedCategories}
          setSelectedCategories={this.setSelectedCategories}
        />

        <Billable setBillable={this.setBillable} billable={billable} />

        <Timer
          setStartTime={this.setStartTime}
          setEndTime={this.setEndTime}
          startTime={startTime}
          isIncompleteEntry={isIncompleteEntry}
          setBothTimes={this.setBothTimes}
        />
      </div>
    );
  }

  componentDidMount() {
    if (this.props.incompleteEntry) {
      const id = Object.keys(this.props.incompleteEntry)[0];
      const incompleteEntry = this.props.incompleteEntry[id];

      this.setState({
        description: incompleteEntry.description,
        selectedProject: incompleteEntry.selectedProject,
        selectedCategories: incompleteEntry.selectedCategories,
        billable: incompleteEntry.billable,
        startTime: incompleteEntry.startTime
      });
    }
  }
}

TimeEntryForm.propTypes = {
  addTimeEntry: PropTypes.func.isRequired
};
