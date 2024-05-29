const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


document.addEventListener("DOMContentLoaded", function () {
  const offerElements = document.querySelectorAll(".offer");

  offerElements.forEach(function (offerElement) {
    const status = offerElement.textContent.trim();

    if (status === "true") {
      offerElement.style.backgroundColor = "green";
    } else if (status === "false") {
      offerElement.style.backgroundColor = "red";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const statueCm = document.querySelectorAll(".statueCm");

  statueCm.forEach(function (statueCm) {
    const status = statueCm.textContent.trim();
    if (status === "en coure") {
      statueCm.style.backgroundColor = "";
    } else if (status === "confirmed") {
      statueCm.style.backgroundColor = "#1b2850"
    }else {
      statueCm.style.backgroundColor = "green"
    }
  })
})

document.querySelectorAll(".delete").forEach(function (button) {
  button.addEventListener("click", function (event) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer?")) {
      event.preventDefault();
    }
  });
});

