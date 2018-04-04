import $ from "jquery";
import { list } from "./list";
import { layout } from "./layout";
import { renderEditor } from "./editor";
import { renderLogin } from "./login";

export function render() {
  const pathName = location.pathname;
  layout().remove();

  if (!pathName || pathName === "/") {
    list().catch(err =>
      printError("Sorry, Unable to load blog entries...", err)
    );
  } else if (pathName.startsWith("/edit")) {
    renderEditor();
  } else if (pathName === "/login") {
    renderLogin();
  } else {
    printError("404 - unknown url " + pathName);
  }
}

export function route(target) {
  history.pushState(null, null, target);
  render();
}

function printError(message, err) {
  if (err) console.error(err);
  let main = layout();
  const errorDiv = $('<div class="message error-message">');
  errorDiv.html(message);
  main.append(errorDiv);
}
