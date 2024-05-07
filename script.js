const monthsBig = [1, 3, 5, 7, 8, 10, 12];
const monthsNormal = [4, 6, 9, 11];
const monthsSmall = [2];
let inputDay = document.getElementById("day");
let inputMonth = document.getElementById("month");
let inputYear = document.getElementById("year");

let errorDay = document.getElementById("error-day");
let errorMonth = document.getElementById("error-month");
let errorYear = document.getElementById("error-year");

let Day = document.getElementById("days-conversion");
let Month = document.getElementById("months-conversion");
let Year = document.getElementById("years-conversion");

console.log(inputMonth.value);

function validateDayConditions(day, month = 0, year) {
  if (day < 1 || day > 31) return false;

  if (day > 0 && day < 32 && month == 0) return true;

  if (day == 31 && monthsBig.includes(month)) return true;

  if (
    (day == 30 || day == 29) &&
    (monthsNormal.includes(month) || monthsBig.includes(month))
  )
    return true;

  if (day == 29 && monthsSmall.includes(month)) {
    console.log("Bissexto cindition");
    //descobrir se bisexto
    const bisexto = (year) => {
      //Divisible by four?
      if (year % 4 != 0) return false;
      if (year % 100 == 0) return false;
      if (year % 400 != 0) return false;
      return true;
    };
    // Call the bisexto function with the year argument
    if (!bisexto(year)) return false; // If not a leap year, return false
  }
  if (day > 0 && day < 29) return true;
  else return false;
}
function validateDay() {
  if (inputDay.value == null || inputDay.value == "") {
    errorDay.style.display = "block";
    errorDay.innerHTML = "This field is required";
  } else if (
    !validateDayConditions(
      inputDay.value,
      inputMonth.value != null && inputMonth.value > 0 && inputMonth.value < 13
        ? inputMonth.value
        : 0,
      inputYear.value
    )
  ) {
    errorDay.style.display = "block";
    errorDay.innerHTML = "Must be a valid day";
  } else {
    errorDay.style.display = "none";
    return true;
  }
  return false;
}

//MONTH
function validateMonth(month) {
  if (month == null || month == "") {
    errorMonth.style.display = "block";
    errorMonth.innerHTML = "This field is required";
    return false;
  } else if (month > 0 && month < 13) {
    errorMonth.style.display = "none";
    return true;
  } else {
    errorMonth.style.display = "block";
    errorMonth.innerHTML = "Must be a valid month";
    return false;
  }
}
//YEAR
function validateYear(year) {
  const date = new Date();
  const yearNow = date.getFullYear();
  if (year == null || year == "") {
    errorYear.style.display = "block";
    errorYear.innerHTML = "This field is required";
    return false;
  } else if (year <= yearNow && year >= 0) {
    errorYear.style.display = "none";
    return true;
  } else {
    errorYear.style.display = "block";
    errorYear.innerHTML = "Must be a valid year";
    return false;
  }
}

// NOW DATE for then to subtract and get pretended output
function currentDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate); // "17-6-2022"

  return [day, month, year];
}

function convertTime() {
  let days = 0;
  let months = 0;
  let years = 0;
  //validateInput(day, month, year);
  //search for time data type maybe? easier, i think.
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  const cd_day = currentDate.getDate();
  const cd_month = currentDate.getMonth() + 1;
  const cd_year = currentDate.getFullYear();
  //convert to seconds both;
  const inputDate = new Date(
    Date.UTC(inputYear.value, inputMonth.value, inputDay.value)
  );
  console.log(
    `${inputDate.getDate()}-${inputDate.getMonth()}-${inputDate.getFullYear()}`
  );
  console.log(
    `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`
  );
  console.log(inputDate.valueOf());
  console.log(currentDate.valueOf());

  const dateDifferenceInSeconds = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 1000;

  const dateDifferenceInDays = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 60 * 60 * 24);

  const dateDifferenceInMonths = (dateInitial, dateFinal) =>
    Math.max(
      (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
        dateFinal.getMonth() -
        dateInitial.getMonth(),
      0
    );

  const dateDifferenceInYears = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 60 * 60 * 24 * 365.3);

  let x = dateDifferenceInSeconds(inputDate.valueOf(), currentDate.valueOf());

  //years
  years = dateDifferenceInYears(inputDate, currentDate);
  console.log("/n/n difference in years: " + Math.trunc(years));
  //months
  months = dateDifferenceInMonths(inputDate, currentDate);
  console.log(
    "/n/n difference in months: " + Math.trunc((years - Math.trunc(years)) * 12)
  );
  //days
  console.log(
    "/n/n difference in days: " +
      ((years - Math.trunc(years)) * 12 -
        Math.trunc((years - Math.trunc(years)) * 12))
  );
  //days
  console.log(
    "/n/n difference in days: " + ((years - Math.trunc(years)) * 365) / 30.41
  );
  days = Math.trunc(((years - Math.trunc(years)) * 365) / 30.41);
  months = Math.trunc((years - Math.trunc(years)) * 12);
  years = Math.trunc(years);
  console.log(`${days}-${months}-${years}`);

  const birthday = `${inputYear.value}-${inputMonth.value}-${inputDay.value}`;
  let years1 = new Date().getFullYear() - new Date(birthday).getFullYear();
  years1 = Math.trunc(years);

  let months1 = new Date().getMonth() - new Date(birthday).getMonth();
  let days1 = new Date().getDate() - Number(inputDay.value);

  console.log(`${days1}-${months1}-${years1}`);

  return [days1, months1, years1];
}
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
/*
 *
 *
 *
 *
 *
 */

function animateNumber(span, endValue) {
  let currentValue = 0;
  let increment = 1;
  let interval = setInterval(() => {
    currentValue += increment;

    if (currentValue >= endValue) {
      currentValue = endValue;
      clearInterval(interval);
    }

    span.innerText = currentValue;
  }, 40);
}

//validation and conversion of time
function buttonClick() {
  console.log(inputYear.value);

  if (isInputValid()) {
    console.log("Test Passed = input valid");
    let finalDate = convertTime();
    /*
    Day.innerHTML = Math.abs(finalDate[0]) + " ";
    Month.innerHTML = Math.abs(finalDate[1]) + " ";
    Year.innerHTML = Math.abs(finalDate[2]) + " ";*/
    animateNumber(Day, Math.abs(finalDate[0]));
    animateNumber(Month, Math.abs(finalDate[1]));
    animateNumber(Year, Math.abs(finalDate[2]));
  } else {
    Day.innerHTML = "--";
    Month.innerHTML = "--";
    Year.innerHTML = "--";
  }
  console.log("Validation not passed!");
}
//validation
function isInputValid() {
  let isValidDay = validateDay();
  let isValidMonth = validateMonth(inputMonth.value);
  let isValidYear = validateYear(inputYear.value);
  /*
  if (
    validateDay(inputDay.value, inputMonth.value, inputYear.value) &&
    validateMonth(inputMonth.value) &&
    validateYear(inputYear.value)
  ) {
  }*/
  let isValid = isValidMonth && isValidYear && isValidDay; // correto
  console.log("year validation: " + isValidYear);
  console.log("month validation: " + isValidMonth);
  console.log("day validation: " + isValidDay);
  console.log("validation pass: " + isValid);

  return isValid;
}
