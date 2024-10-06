const input = document.getElementById("search-input");
const result = document.getElementById("result");
const oCount = result.querySelector("#default-count");
const dCount = result.querySelector("#debounce-count");
const tCount = result.querySelector("#throttle-count");

let defaultCount = 0;
let debouncedCount = 0;
let throttledCount = 0;

// Create Reactangle

const createDivElement = (color) => {
  const div = document.createElement("div");
  div.classList.add("trigger-box");
  div.style.backgroundColor = color;
  return div;
};

const updateCount = (e, countType) => {
  const value = e.target.value;
  if (countType === "default") {
    console.log(`default value ${value}`);
    defaultCount++;
    oCount.textContent = `${defaultCount}`;

    // Add  div
    const divContainer = result.querySelector(".default-container");
    const div = createDivElement("red");
    divContainer.appendChild(div);
  }
  if (countType === "debounced") {
    console.log(`debounced value ${value}`);
    debouncedCount++;
    dCount.textContent = `${debouncedCount}`;

    // Add  div
    const divContainer = result.querySelector(".debounce-container");
    const div = createDivElement("green");
    divContainer.appendChild(div);
  }
  if (countType === "throttled") {
    console.log(`throttled value ${value}`);
    throttledCount++;
    tCount.textContent = `${throttledCount}`;

    // Add  div
    const divContainer = result.querySelector(".throttle-container");
    const div = createDivElement("purple");
    divContainer.appendChild(div);
  }
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
const debounced = debounce(updateCount, 500);

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
const throttled = throttle(updateCount, 300);

// Add Event Listener
input.addEventListener("keyup", (e) => {
  updateCount(e, "default");
  debounced(e, "debounced");
  throttled(e, "throttled");
});
