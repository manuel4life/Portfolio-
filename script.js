document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! I will get back to you soon.");
  form.reset();
});

document.querySelector(
  "footer p"
).textContent = `© ${new Date().getFullYear()} Emmanuel Allotey. All rights reserved.`;

document.addEventListener("DOMContentLoaded", function () {
  // USSD Simulator Logic
  const ussdDisplay = document.querySelector(".ussd-display");
  const keys = document.querySelectorAll(".key");

  let ussdCode = "";

  keys.forEach((key) => {
    key.addEventListener("click", function () {
      const value = this.textContent;

      if (value === "#") {
        // Process USSD code
        processUSSD(ussdCode);
        ussdCode = "";
      } else if (value === "*") {
        // Clear input
        ussdCode = "";
        updateDisplay(
          "Welcome to SmartAgricLink\n1. Weather Forecast\n2. Pest Control Tips\n3. Market Prices"
        );
      } else {
        // USSD code
        ussdCode += value;
        updateDisplay(`USSD Code: ${ussdCode}`);
      }
    });
  });

  function updateDisplay(text) {
    ussdDisplay.innerHTML = text
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("");
  }

  function processUSSD(code) {
    let response = "";

    switch (code) {
      case "1":
        response = "Weather Forecast:\nSunny, 28°C\nRain expected tomorrow";
        break;
      case "2":
        response =
          "Pest Control:\nFor maize, use neem oil spray\nApply every 2 weeks";
        break;
      case "3":
        response =
          "Market Prices:\nMaize: GHS 350/bag\nTomatoes: GHS 200/crate";
        break;
      default:
        response = "Invalid selection\nPlease try again";
    }

    updateDisplay(response);
  }
});
