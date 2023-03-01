class Codeblock extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    var pre = document.createElement("pre");
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
    var script = document.createElement("script");
    script.setAttribute("type", "text/template");
    script.innerHTML = this.innerHTML;
    code.appendChild(script);

    this.attributes.forEach((x) => {
      pre.setAttribute(x.name, x.value);
    });
    pre.appendChild(code);
    this.outerHTML = pre.outerHTML;
  }
}

customElements.define("code-block", Codeblock);
