import $ from "jquery";
import { layout } from "./layout";
export function renderLogin() {
  const main = layout();

  main.append(`
  <form action="/api/login" method="POST" class="login-form">
    <input type="text" name="username" placeholder="name">
    <input type="password" name="password" placeholder="password">
    <input type="hidden" name="failureRedirect" value="/login">
    <input type="hidden" name="successRedirect" value="/edit">
    <button type="submit">Login</button>
  </form>
  `);
}
