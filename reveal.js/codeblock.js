class Codeblock extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    var pre = document.createElement("pre");
    pre.innerHTML = this.innerHTML;
    if (this.firstChild.nextSibling.localName === "pre")
      pre = this.firstChild.nextSibling;

    var code = document.createElement("code");

    if (this.getAttribute("data-line-numbers"))
      code.setAttribute(
        "data-line-numbers",
        this.getAttribute("data-line-numbers")
      );
    if (this.getAttribute("data-ln-start-from"))
      code.setAttribute(
        "data-ln-start-from",
        this.getAttribute("data-ln-start-from")
      );
    code.setAttribute("data-trim", "");
    code.classList.add("hljs");
    this.removeAttribute("data-trim");
    this.removeAttribute("data-ln-start-from");
    this.removeAttribute("data-line-numbers");
    if (!this.hasAttribute("data-escape")) {
      var script = document.createElement("script");
      script.setAttribute("type", "text/template");
      script.innerHTML = pre.innerHTML;
      code.appendChild(script);
    }

    this.attributes.forEach((x) => {
      pre.setAttribute(x.name, x.value);
    });
    pre.innerHTML = "";
    pre.appendChild(code);
    try {
      this.outerHTML = pre.outerHTML;
    } catch (e) {}
  }
}

customElements.define("code-block", Codeblock);
