import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserClock } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import { createTimestamp } from "../utils/timeUtils";

import TimerMode from "./TimerMode";
import ManualMode from "./ManualMode";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTiming: false,
      inTimerMode: true
    };

    this.handleManualSubmit = this.handleManualSubmit.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.toggleTimerMode = this.toggleTimerMode.bind(this);
  }

  handleTimerClick() {
    const { isTiming } = this.state;
    const { setStartTime, setEndTime } = this.props;

    if (!isTiming) {
      this.setState({ isTiming: true });
      const startTime = createTimestamp();
      setStartTime(startTime);
    } else {
      this.setState({ isTiming: false });
      const endTime = createTimestamp();
      setEndTime(endTime);
    }
  }

  handleManualSubmit(startTime, endTime) {
    const { setStartTime, setEndTime } = this.props;

    setStartTime(startTime);
    setEndTime(endTime);
  }

  toggleTimerMode() {
    const { isTiming } = this.state;
    if (!isTiming) {
      this.setState(prevState => ({ inTimerMode: !prevState.inTimerMode }));
    }
  }

  render() {
    const { isTiming, inTimerMode } = this.state;
    const { startTime } = this.props;

    return (
      <Fragment>
        <div className="flex w-100 items-center justify-end ph2">
          {inTimerMode ? (
            <TimerMode
              isTiming={isTiming}
              startTime={startTime}
              handleTimerClick={this.handleTimerClick}
            />
          ) : (
            <ManualMode handleManualSubmit={this.handleManualSubmit} />
          )}
        </div>

        <div className="items-center pointer dim">
          <FontAwesomeIcon
            icon={inTimerMode ? faEdit : faUserClock}
            size="1x"
            onClick={this.toggleTimerMode}
          />
        </div>
      </Fragment>
    );
  }
}

Timer.propTypes = {
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  startTime: PropTypes.string.isRequired
};
