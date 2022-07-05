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
  // upcoming: `http://localhost:3030/jsonstore/forecaster/upcoming/${upcomingLocation}`,

  // Add functionality to the button
  getButton.addEventListener("click", async (e) => {
    const data = await fetch(locationsUrl);
    const response = await data.json();

    const currentCity = response.find((c) => c.name == inputField.value);

    div.forecast.style.display = "block";
    getCurrentConditions(currentCity, div.current);
    inputField.value = ''
  });
}

attachEvents();

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

async function getCurrentConditions(location, section) {
  const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;

  const data = await fetch(todayUrl);
  const response = await data.json();

  buildCurrentCondition(response, section);
}

function buildCurrentCondition(location, section) {
  const symbol = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
    degrees: "°",
  };

  let div = createNewElement("div", "forecasts");
  div.appendChild(
    createNewElement("span", "condition symbol", symbol[location.forecast.condition])
  );
  let span = createNewElement("span", "condition")
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

//   TODO find a way to clear the section
  div.appendChild(span);
  section.appendChild(div);
}
