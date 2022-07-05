function attachEvents() {
  // Take all elements needed
  const inputField = document.querySelector("#location");
  const getButton = document.querySelector("#submit");

  const div = {
    forecast: document.querySelector("#forecast"),
    current: document.querySelector("#current"),
    upcoming: document.querySelector("#upcoming"),
  };

  const locationsUrl = "http://localhost:3030/jsonstore/forecaster/locations";

  // Add functionality to the button
  getButton.addEventListener("click", async (e) => {
    const symbol = {
      Sunny: "☀",
      "Partly sunny": "⛅",
      Overcast: "☁",
      Rain: "☂",
      degrees: "°",
    };

    const data = await fetch(locationsUrl);
    const response = await data.json();

    const currentCity = response.find((c) => c.name == inputField.value);

    div.forecast.style.display = "block";
    inputField.value = "";

    try {
      if (currentCity == undefined) {
        throw new Error(`Invalid Location!`);
      }
      getCurrentConditions(currentCity, div.current, symbol);
      getUpcommingConditions(currentCity, div.upcoming, symbol);
    } catch (e) {
      div.current.appendChild(createNewElement("h2", "error", e));
    }
  });
}

attachEvents();

// Factory func for creating a new elements
function createNewElement(type, className, data) {
  let element = document.createElement(type);

  if (className) {
    element.className = className;
  }

  if (data) {
    element.innerText = data;
  }

  return element;
}

// Func that sends a request and process data for current condition section
async function getCurrentConditions(location, section, symbol) {
  const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;

  const data = await fetch(todayUrl);
  const response = await data.json();

  buildCurrentCondition(response, section, symbol);
}

// Func that sends a request and process data for upcomming section
async function getUpcommingConditions(location, section, symbol) {
  const upcommingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;

  const data = await fetch(upcommingUrl);
  const response = await data.json();

  buildUpcommingCondition(response, section, symbol);
}

// Func that builds the current condition section
function buildCurrentCondition(location, section, symbol) {
  section.innerHTML = "";
  section.appendChild(createNewElement("div", "label", "Current conditions"));

  let div = createNewElement("div", "forecasts");

  div.appendChild(
    createNewElement(
      "span",
      "condition symbol",
      symbol[location.forecast.condition]
    )
  );
  let span = createNewElement("span", "condition");
  span.appendChild(createNewElement("span", "forecast-data", location.name));

  span.appendChild(
    createNewElement(
      "span",
      "forecast-data",
      `${location.forecast.high}${symbol.degrees}/${location.forecast.low}${symbol.degrees}`
    )
  );
  span.appendChild(
    createNewElement("span", "forecast-data", location.forecast.condition)
  );

  div.appendChild(span);
  section.appendChild(div);
}

// Func that builds the current condition section
function buildUpcommingCondition(location, section, symbol) {
  section.innerHTML = "";
  section.appendChild(createNewElement("div", "label", "Three-day forecast"));

  let div = createNewElement("div", "forecasts-info");

  location.forecast.forEach((f) => {
    let span = createNewElement("span", "upcoming");
    span.appendChild(createNewElement("span", "symbol", symbol[f.condition]));
    span.appendChild(
      createNewElement(
        "span",
        "forecasts-data",
        `${f.low}${symbol.degrees}/${f.high}${symbol.degrees}`
      )
    );
    span.appendChild(createNewElement("span", "forecasts-data", f.condition));
    div.appendChild(span);
  });

  section.appendChild(div);
}
