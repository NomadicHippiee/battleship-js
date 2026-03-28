import "./style.css";

console.log("Webpack is alive!");

function component() {
  const element = document.createElement("div");
  element.textContent = "Hello, Webpack Starter Template!";
  element.classList.add("starter-template");
  return element;
}

document.body.appendChild(component());
