const years = document.querySelector("#years");
const months = document.querySelectorAll(".monthCalendar");
const days = document.querySelectorAll(".daysCalendar");

// HIDE
export function hideYearsView() {
  years.style.display = "none";
}

export function hideMonthsView() {
  Array.from(months).forEach((m) => (m.style.display = "none"));
}

export function hideDaysView() {
  Array.from(days).forEach((d) => (d.style.display = "none"));
}

// RENDER
export function renderYearsView() {
  years.style.display = "block";
}

export function renderMonthsView(year) {
  const monthsOfYear = Array.from(months).find((m) => m.id == `year-${year}`);
  monthsOfYear.style.display = "block";
}

export function daysRenderView(date) {
  const dates = Array.from(days).find((d) => d.id == date);
  dates.style.display = "block";
}
