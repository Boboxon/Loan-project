//Listen For results
document.getElementById("loan-form").addEventListener("submit", function (e) {
  //hide loading
  document.getElementById("results").style.display = "none";

  //show
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

//   Create calaculate result function

function calculateResults() {
  console.log("Calculating...");

  //   UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  // result UI
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //   Formula
  const principle = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calcualtePayments = parseFloat(years.value) * 12;

  // Calculate
  const x = Math.pow(1 + calculateInterest, calcualtePayments);
  const monthly = (principle * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcualtePayments).toFixed(2);
    totalInterest.value = (monthly * calcualtePayments - principle).toFixed(2);

    //show result
    document.getElementById("results").style.display = "block";
    //hide
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers");
  }
}

// ERR0R Function
function showError(error) {
  document.getElementById("results").style.display = "none";
  //hide
  document.getElementById("loading").style.display = "none";
  const errorDiv = document.createElement("div");

  //get elemnts
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  //heading above errro
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

//remove Error after 3 secnds
function clearError() {
  document.querySelector(".alert").remove();
}
