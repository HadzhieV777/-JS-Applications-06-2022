async function getInfo() {
  const inputField = document.querySelector("#stopId");
  const stopNameDiv = document.querySelector("#stopName");
  const bussesUl = document.querySelector("#buses");

  try {
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputField.value}`;
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(`Error: Invalid Id!`);
    }
    const busesInfo = await response.json();

    stopNameDiv.innerText = busesInfo.name;
    bussesUl.innerHTML = "";

    Object.entries(busesInfo.buses).forEach((b) => {
      let li = document.createElement("li");
      li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
      bussesUl.appendChild(li);
    });
  } catch (error) {
    stopNameDiv.innerHTML = `<h4 style="color:red;">${error.message}</h4>`;
  }
}
