import moment from 'moment';

const TIME_INPUTS = [
  'hh:mma',
  'hh:mm a',
  'hmm',
  'hmma',
  'hmm a',
  'hhmm',
  'hhmma',
  'hhmm a',
  'HHmm',
  'HH:mm',
  'Hmm',
  'H:mm',
];

// used in manual timer to convert user input
export function displayTimeInput(input) {
  return moment(input.substring(0, 6).trim(), TIME_INPUTS).format('hh:mm a');
}

// used in timerClick when starting and stopping & used in running timer in Timer
export function createTimestamp() {
  return moment().toISOString();
}

// used in Timer when creating manual entry
export function createManualTimestamp(timeStr) {
  return moment(timeStr, 'hh:mm a').toISOString();
}

// used when displaying TimerHistory Item in Dashboard
export function displayDate(timeStr) {
  return moment(timeStr).format('L');
}

// used below when displaying start and end times
export function displayTime(timeStr) {
  return moment(timeStr).format('LT');
}

// used when displaying TimerHistory Item in Dashboard
export function displayStartAndEndTimes(startTime, endTime) {
  return `${displayTime(startTime)} - ${displayTime(endTime)}`;
}

// used when displaying TimerHistory Item in Dashboard & used in running timer in Timer
export function displayTimeElapsed(start, end) {
  const time = moment.utc(moment(end).diff(moment(start)));
  return time.isValid() ? time.format('HH:mm:ss') : '00:00:00';
}

// used in Timer when creating manual entries
export function createManualTimestampWithDate(timeStr, date) {
  return (
    moment(date)
      .toISOString()
      .slice(0, 10) +
    moment(timeStr, 'hh:mm a')
      .toISOString()
      .slice(10)
  );
}
