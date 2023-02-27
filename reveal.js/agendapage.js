class Agenda extends HTMLElement {
  constructor() {
    super();

    this.icons = [];
    this.tmp = "";
    Array.from(this.querySelectorAll("svg, img, object")).forEach((item) => {
      var cln = item.cloneNode(true);
      this.icons.push(cln);
    });

    this.innerHTML = "";

    Reveal.on("ready", (event) => {
      this.slides = Reveal.getHorizontalSlides().filter((slide) =>
        slide.hasAttribute("title")
      );
      this.init();
    });
  }

  append(html) {
    this.tmp += html;
  }

  init() {
    var iconrow = document.createElement("div");
    iconrow.classList.add("agenda");
    this.appendChild(iconrow);

    this.icons.forEach((element, index) => {
      var entry = document.createElement("div");
      entry.classList.add("agenda-entry");
      entry.appendChild(element);
      var title = document.createElement("p");
      try {
        title.innerHTML = this.slides[index].attributes["title"].value;
      } catch (e) {
        console.log(`Title missing for icon #${index}`);
        title.innerHTML = "&#8203;";
      }
      entry.appendChild(title);
      iconrow.appendChild(entry);
    });

    if (this.slides.length > this.icons.length) {
      for (let i = this.icons.length; i < this.slides.length; i++) {
        console.log(`Icon missing for title #${i}`);
        var entry = document.createElement("div");
        entry.classList.add("agenda-entry");
        entry.appendChild(document.createElement("svg"));
        var title = document.createElement("p");
        title.innerHTML = this.slides[i].attributes["title"].value;
        entry.appendChild(title);
        iconrow.appendChild(entry);
      }
    }
  }
}
customElements.define("agenda-view", Agenda); // (2)
