function solve() {
  const busesInfo = document.querySelector(".info");
  const buttons = {
    depart: document.getElementById("depart"),
    arrive: document.getElementById("arrive"),
  };

  let stop = {
    next: "depot",
  };

  async function depart() {
    try {
      buttons.depart.disabled = true;
      const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
      const response = await fetch(url);

      if (response.ok == false) {
        throw new Error("Invalid data!");
      }

      stop = await response.json();

      busesInfo.innerText = `Next stop ${stop.name}`;
      buttons.arrive.disabled = false;
    } catch (e) {
      buttons.depart.disabled = true;
      buttons.arrive.disabled = true;
      busesInfo.innerText = e;
    }
  }

  function arrive() {
    buttons.arrive.disabled = true;
    busesInfo.innerText = `Arriving at ${stop.name}`;
    buttons.depart.disabled = false;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
