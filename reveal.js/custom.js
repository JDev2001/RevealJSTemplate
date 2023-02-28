function changeTheme() {
  console.log("T key pressed, changing Theme!");
  if (document.querySelector(`link[href="dist/theme/white.css"`)) {
    var newStyle = document.createElement("link");
    newStyle.href = "dist/theme/black.css";
    newStyle.rel = "stylesheet";
    document.head.appendChild(newStyle);
    document.head.removeChild(
      document.querySelector(`link[href="dist/theme/white.css"]`)
    );
  } else {
    var newStyle = document.createElement("link");
    newStyle.href = "dist/theme/white.css";
    newStyle.rel = "stylesheet";
    document.head.appendChild(newStyle);
    document.head.removeChild(
      document.querySelector(`link[href="dist/theme/black.css"]`)
    );
  }
}
