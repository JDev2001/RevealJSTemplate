var previousContentSlide = 0;
var slides;
var intSlidesCount;
var header = document.createElement("div");
header.id = "header";
var imgcontainer = document.createElement("div");
imgcontainer.id = "imgcontainer";
imgcontainer.style.cssText = `height: 100%"`;
var image = document.createElement("img");
image.style.cssText = `height: 8vh; width: auto;`;
image.src = "./images/dhbwlogo.svg";
imgcontainer.appendChild(image);
header.appendChild(imgcontainer);
document.body.prepend(header);
var titlecontainer = document.createElement("div");
titlecontainer.id = "titlecontainer";
titlecontainer.style.cssText = `
overflow: hidden;
display: flex;
align-items: center;
flex-direction: row;
padding: 1em;
z-index: 488;
color: white;
width: 100%;
max-height: 10vh;
min-height: 10vh;
gap: 3em;`;
header.appendChild(titlecontainer);

Reveal.on("ready", (event) => {
  slides = Reveal.getHorizontalSlides()
    .filter((slide) => slide.hasAttribute("title"))
    .map((slide) => ({
      name: slide.attributes["title"].value,
      childs: [],
    }));

  contentSlidesLength = Reveal.getHorizontalSlides().length - slides.length;

  Reveal.getVerticalSlides().forEach((slide) => {
    slides.forEach((s) => {
      if (slide.parentElement.attributes["title"] == null) return;
      if (s.name === slide.parentElement.attributes["title"].value) {
        s.childs.push(slide);
      }
    });
  });

  generateAgenda();
  // toggle Agenda visibility
  changeDisplay(event.indexh);
  scrollTitle(event.indexh - contentSlidesLength, false);
  updateAgenda(event.indexh - contentSlidesLength, event.indexv);

  Reveal.on("slidechanged", (event) => {
    changeDisplay(event.indexh);
    updateAgenda(event.indexh - contentSlidesLength, event.indexv);
    // scrollTitle(event.indexh - contentSlidesLength);
  });
});

function updateAgenda(currentSlide, currentSubslide) {
  // guard clause if not a content slide
  if (currentSlide < 0) return;

  const slideElement = titlecontainer.children[currentSlide];

  // reset title focus
  titlecontainer.children.forEach((child) => {
    child.querySelector(".header-title").classList.remove("focus");
    child.querySelector(".bulletpoint").classList.remove("focus");
    child.querySelector(
      ".bulletpoint"
    ).innerHTML = `<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>`;
  });

  // add focus to active title
  slideElement.querySelector(".header-title").classList.add("focus");
  slideElement.querySelector(".bulletpoint").classList.add("focus");
  slideElement.querySelector(
    ".bulletpoint"
  ).innerHTML = `<circle cx="8" cy="8" r="8"/>`;

  // reset subtitle focus
  document.querySelectorAll(".header-subtitle").forEach((subtitle, index) => {
    // if (index !== currentSubslide - 1)
    subtitle.classList.add("inactive");
  });

  // scroll title into view
  scrollTitle(currentSlide, true);

  // check for subtitles
  if (
    !slideElement.querySelector(".header-subtitle") ||
    !slideElement.querySelectorAll(".header-subtitle")[currentSubslide]
  )
    return;

  // add focus to active subtitle
  slideElement
    .querySelectorAll(".header-subtitle")
    [currentSubslide].classList.add("active");
  slideElement
    .querySelectorAll(".header-subtitle")
    [currentSubslide].classList.remove("inactive");
}

function changeDisplay(indexh) {
  if (!Reveal.getHorizontalSlides()[indexh].hasAttribute("title")) {
    header.style.visibility = "hidden";
    document.querySelector(".reveal").classList.remove("agenda-reveal");
    return;
  }
  header.style.visibility = "visible";
  document.querySelector(".reveal").classList.add("agenda-reveal");
}

function generateAgenda() {
  slides.forEach((slide) => {
    var newTitle = document.createElement("div");
    titlecontainer.appendChild(newTitle);
    var dynamicWidth;
    if (slides.length < 4) {
      dynamicWidth = 85 / slides.length - 1 + "vw";
    } else {
      dynamicWidth = 85 / 5 + "vw";
    }
    newTitle.style.cssText = `display: flex; 
      justify-content:center; 
      flex-direction: column; 
      gap: 0.5em; align-items: 
      center; min-width: ${dynamicWidth}`;
    newTitle.innerHTML += `
    <div style="display: flex; align-items: center; justify-content: center;  gap: 0.5em;">
    <svg xmlns="http://www.w3.org/2000/svg" class="bulletpoint bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      </svg>
      <a class="header-title">${slide.name}</a>
    </div>
    `;
    console.log(
      newTitle.querySelector(".header-title").getBoundingClientRect()
    );
    // Change css properties to properly generate subtitle margins
    newTitle.querySelector(".header-title").style.fontSize = "2.9vh";
    newTitle.querySelector(".bulletpoint").style.height = "1vh";
    newTitle.querySelector(".bulletpoint").style.width = "1vh";
    slide.childs.forEach((x) => {
      if (!x.attributes["title"]) return;
      var subslideName = x.attributes["title"].value;
      newTitle.innerHTML += `
					<a class="header-subtitle" style="margin-left: calc(${
            newTitle.querySelector(".header-title").offsetLeft -
            newTitle.offsetLeft
          }px + 2px)">${subslideName}</a>`;
    });
    // Reset css properties
    // Change css properties to properly generate subtitle margins
    newTitle.querySelector(".header-title").style.removeProperty("fontsize");
    newTitle.querySelector(".bulletpoint").style.removeProperty("height");
    newTitle.querySelector(".bulletpoint").style.removeProperty("height");
  });
}

function scrollTitle(currentSlide, smooth) {
  var scrollBehavior = "smooth";
  if (!smooth) scrollBehavior = "auto";
  if (currentSlide > previousContentSlide) {
    if (currentSlide === slides.length - 1) {
      titlecontainer.children[currentSlide].scrollIntoView({
        behavior: scrollBehavior,
        block: "end",
        inline: "center",
      });
      return;
    }
    titlecontainer.children[currentSlide + 1].scrollIntoView({
      behavior: scrollBehavior,
      block: "end",
      inline: "center",
    });
  } else {
    if (currentSlide - 1 < 0) return;
    titlecontainer.children[currentSlide - 1].scrollIntoView({
      behavior: scrollBehavior,
      block: "end",
      inline: "center",
    });
  }
  previousContentSlide = currentSlide;
}
