const daysContainer = document.querySelector(".days"), /* Selecteert de container voor dagen */
  nextBtn = document.querySelector(".next-btn"), /* Selecteert de volgende knop */
  prevBtn = document.querySelector(".prev-btn"), /* Selecteert de vorige knop */
  month = document.querySelector(".month"), /* Selecteert het element dat de maand weergeeft */
  todayBtn = document.querySelector(".today-btn"); /* Selecteert de knop om terug te keren naar vandaag */

const months = [
  "Januari",
  "Februari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December",
];

const days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

// Haal de huidige datum op
const date = new Date();

// Haal de huidige maand op
let currentMonth = date.getMonth();

// Haal het huidige jaar op
let currentYear = date.getFullYear();

// Functie om dagen weer te geven
function renderCalendar() {
  // Haal dagen op van de vorige maand, huidige maand en volgende maand
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  // Update het huidige jaar en maand in de header
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  // Update HTML voor dagen
  let days = "";

  // HTML voor dagen van de vorige maand
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // Dagen van de huidige maand
  for (let i = 1; i <= lastDayDate; i++) {
    // Controleer of het vandaag is en voeg vandaag-klasse toe
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // Als de datum overeenkomt, voeg vandaag toe
      days += `<div class="day today">${i}</div>`;
    } else {
      // Anders voeg niet vandaag toe
      days += `<div class="day ">${i}</div>`;
    }
  }

  // Dagen van de volgende maand
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  // Voer deze functie uit bij elke kalenderweergave
  verbergVandaagBtn();
  daysContainer.innerHTML = days;
}

renderCalendar();

nextBtn.addEventListener("click", () => {
  // Verhoog de huidige maand met één
  currentMonth++;
  if (currentMonth > 11) {
    // Als de maand groter wordt dan 11, maak het 0 en verhoog het jaar met één
    currentMonth = 0;
    currentYear++;
  }
  // Rerender de kalender
  renderCalendar();
});

// Knop voor vorige maand
prevBtn.addEventListener("click", () => {
  // Verminder met één
  currentMonth--;
  // Controleer of het minder dan 0 is, maak het dan 11 en verminder het jaar
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// Ga naar vandaag
todayBtn.addEventListener("click", () => {
  // Stel maand en jaar in op huidig
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // Rerender de kalender
  renderCalendar();
});

// Verberg de vandaag knop als het al de huidige maand is en vice versa
function verbergVandaagBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}
