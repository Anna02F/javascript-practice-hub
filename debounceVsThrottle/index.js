// Get DOM elements
const input = document.getElementById("search-input");
const result = document.getElementById("result");

const counters = {
  default: result.querySelector("#default-count"),
  debounced: result.querySelector("#debounce-count"),
  throttled: result.querySelector("#throttle-count"),
};

const containers = {
  default: result.querySelector(".default-container"),
  debounced: result.querySelector(".debounce-container"),
  throttled: result.querySelector(".throttle-container"),
};

// Initila counts
const counts = {
  default: 0,
  debounced: 0,
  throttled: 0,
};

// Colors for boxes for a given type
const colors = {
  default: "#E76F51",
  debounced: "#388E3C",
  throttled: "#1976D2",
};

// Utility to create a Div element
const createDivElement = (color) => {
  const div = document.createElement("div");
  div.classList.add("trigger-box");
  div.style.backgroundColor = color;
  return div;
};

// Update the UI and count for a given type
const updateUi = (countType) => {
  counts[countType]++;
  counters[countType].textContent = counts[countType];

  const div = createDivElement(colors[countType]);
  containers[countType].appendChild(div);
};

// Debounced version
const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
};
const debounced = debounce(updateUi, 500);

// Throttled version
const throttle = (fn, delay) => {
  let timeOutId = null;
  return function (...args) {
    if (!timeOutId) {
      fn.call(this, ...args);
    }

    timeOutId = setTimeout(() => {
      timeOutId = null;
    }, delay);
  };
};
const throttled = throttle(updateUi, 300);

// Add Event Listener
input.addEventListener("keyup", () => {
  updateUi("default");``
  debounced("debounced");
  throttled("throttled");
});
