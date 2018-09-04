import React, { Component } from "react";
import PropTypes from "prop-types";
import TimerHistoryItem from "./TimerHistoryItem";

import { removeIncompleteEntries } from "../utils/timerUtils";

export default class TimerHistory extends Component {
  renderHistoryItem() {
    const { timeEntries } = this.props;
    console.log(timeEntries);
    return Object.entries(timeEntries).map(([id, entry]) => {
      const {
        description,
        project,
        categories,
        billable,
        startTime,
        endTime,
        deleteTimeEntry
      } = entry;
      if (entry.endTime != "") {
        return (
          <TimerHistoryItem
            key={id}
            id={id}
            description={description}
            project={project}
            categories={categories}
            billable={billable}
            startTime={startTime}
            endTime={endTime}
            deleteTimeEntry={this.props.deleteTimeEntry}
          />
        );
      }
    });
  }
  render() {
    return <div>{this.renderHistoryItem()}</div>;
  }
}

TimerHistory.propTypes = {
  timeEntries: PropTypes.shape().isRequired
};
