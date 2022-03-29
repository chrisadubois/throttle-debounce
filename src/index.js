import "./styles.css";
import { debounce } from "./debounce";
import { throttlePure, throttleEnd } from "./throttle";

const action = (term) => {
  console.log(term);
};

const debounceHandler = (e) => {
  debounce(() => action(e.target.value), 1000);
};

const throttleHandlerEnd = throttleEnd((e) => action(e.target.value), 1000);

document.getElementById("debounce").addEventListener("input", debounceHandler);
document.getElementById("throttle-pure").addEventListener(
  "input",
  throttlePure(function (e) {
    action(e.target.value);
  }, 500)
);
document
  .getElementById("throttle-end")
  .addEventListener("input", throttleHandlerEnd);
