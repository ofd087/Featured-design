// Local Storage Check And Set Color To Root
let mainColor = localStorage.getItem("color_options");

if (mainColor !== null) {
  // add color to local to root
  document.documentElement.style.setProperty("--main-color", mainColor);

  // remove active class
  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");

    // add active class
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}

// Switch Background Variables
let backgroundOption = true;
let bgImagesInterval;

// Local Storage Check And Set Background Option
let backgroundLocalItem = localStorage.getItem("background_options");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "on") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class
  if (backgroundLocalItem === "on") {
    document.querySelector(".random-backgrounds .on").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .off").classList.add("active");
  }
}

// Toggle Spin Class On Icon And Add Class (open) On Sittings Box
document.querySelector(".toggle-sittings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".sittings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_options", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Background
const bgButtons = document.querySelectorAll(".random-backgrounds span");

bgButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "on") {
      backgroundOption = true;
      randomizeBgImages();

      localStorage.setItem("background_options", e.target.dataset.background);
    } else {
      backgroundOption = false;
      clearInterval(bgImagesInterval);
      localStorage.setItem("background_options", e.target.dataset.background);
    }
  });
});

// Select Landing Page Elements
let landingPage = document.querySelector(".landing-page");

// Array Of Imgs
let imgsArray = [
  "land-back 1.jpg",
  "land-back 2.jpg",
  "land-back 3.jpg",
  "land-back 4.jpg",
  "land-back 5.jpg",
];

// Background Image Changing Function
function randomizeBgImages() {
  if (backgroundOption === true) {
    bgImagesInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Img URL
      landingPage.style.backgroundImage = `url("./imgs/${imgsArray[randomNumber]}")`;
    }, 7000);
  }
}

randomizeBgImages();

// Customers Section Progress
let ourCustomers = document.querySelector(".customers");

window.onscroll = function () {
  // Customers Offset Top
  customersOffsetTop = ourCustomers.offsetTop;

  // Customers Outer Height
  let customersOuterHieight = ourCustomers.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.scrollY;

  if (
    windowScrollTop >
    customersOffsetTop + customersOuterHieight - windowHeight - 5
  ) {
    let allCustomers = document.querySelectorAll(
      ".customers .customer-box .percentage span"
    );
    allCustomers.forEach((element) => {
      element.style.width = element.dataset.progress;
      element.innerHTML = element.dataset.progress;
      element.style.setProperty("padding", "6px");
    });
  }
};

// Create Popup with Images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create And Add Overlay
    let Overlay = document.createElement("div");
    Overlay.classList.add("popup-overlay");

    document.body.append(Overlay);

    // Create And Add Popup Box
    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    // Create The Image
    let popupImage = document.createElement("img");
    popupImage.src = e.target.src;

    popupBox.appendChild(popupImage);
    document.body.append(popupBox);

    // Create And Add Image Heading
    if (img.alt !== null) {
      let imageHeading = document.createElement("h3");
      let imageText = document.createTextNode(img.alt);

      imageHeading.append(imageText);
      popupBox.prepend(imageHeading);

      //Create And Add Close Button
      let closeButton = document.createElement("span");
      let closeButtonText = document.createTextNode("X");

      closeButton.append(closeButtonText);
      closeButton.classList = "close-button";

      popupBox.prepend(closeButton);
    }
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Navegation Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Links Scroll
const allLinks = document.querySelectorAll(".landing-page .links li");

// Scrolling To Target Function
function goToTarget(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

goToTarget(allBullets);
goToTarget(allLinks);

// Handle Active Function
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  event.target.classList.add("active");
}

// Bullets On/Off
let bulletsSpan = document.querySelectorAll(".side-bullets span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets_options");

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalItem === "on") {
    bulletsContainer.style.display = "block";
    document.querySelector(".side-bullets .on").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".side-bullets .off").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "on") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_options", e.target.dataset.display);
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_options", e.target.dataset.display);
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-sittings").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_options");
  localStorage.removeItem("background_options");
  localStorage.removeItem("bullets_options");

  window.location.reload();
};

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};

links.onclick = function (e) {
  e.stopPropagation();
};

// Click Anywhere To Close The Toggle Menu
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    if (links.classList.contains("open")) {
      toggleBtn.classList.remove("menu-active");
      links.classList.remove("open");
    }
  }
});

//Footer
let dateNow = new Date();
let footerYear = document.querySelector(".footer span");

footerYear.innerHTML = dateNow.getFullYear();
