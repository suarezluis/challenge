import uuid from "uuid/v1";

const KEY_PREFIX = "minutero:";

function setTimeEntry(id, value) {
  localStorage.setItem(id, JSON.stringify(value));
}

export function getTimeEntry(id) {
  return JSON.parse(localStorage.getItem(id));
}

export function removeTimeEntry(id) {
  return localStorage.removeItem(id);
}

export function updateTimeEntry(id, timeEntryAttrs) {
  const oldTimeEntry = getTimeEntry(id);
  const newTimeEntry = Object.assign(oldTimeEntry, timeEntryAttrs);

  setTimeEntry(id, newTimeEntry);
}

export function createTimeEntry(timeEntry) {
  const id = `${KEY_PREFIX}${uuid()}`;

  setTimeEntry(id, timeEntry);
  return id;
}

export function fetchTimeEntries() {
  const allTimeEntries = {};

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    if (!id.includes(KEY_PREFIX)) continue; // eslint-disable-line no-continue
    const entry = getTimeEntry(id);
    allTimeEntries[id] = entry;
  }

  //Create an array of entry objects
  const arrayOfObjects = Object.values(allTimeEntries);
  // sort new array by time in descending order
  arrayOfObjects.sort(compareValues("startTime", "desc"));

  // create a new object
  const newObject = {};

  //populate new object with keys and objects by looping through sorted array
  for (let i = 0; i < arrayOfObjects.length; i++) {
    //assigning same key to object
    let key = Object.keys(allTimeEntries).find(
      key => allTimeEntries[key] === arrayOfObjects[i]
    );
    newObject[key] = arrayOfObjects[i];
  }
  //return new object that is sorted
  return newObject;
}

// Helper function to aid in sorting an array of objects
function compareValues(key, order = "asc") {
  return function(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order == "desc" ? comparison * -1 : comparison;
  };
}

export function extractIncompleteEntry() {
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    if (!id.includes(KEY_PREFIX)) continue; // eslint-disable-line no-continue
    const entry = getTimeEntry(id);
    if (entry.endTime == "") return { [id]: entry };
  }
  return false;
}

export function removeIncompleteEntries() {
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    if (!id.includes(KEY_PREFIX)) continue; // eslint-disable-line no-continue
    const entry = getTimeEntry(id);
    if (entry.endTime == "") {
      removeTimeEntry(id);
    }
  }
}
