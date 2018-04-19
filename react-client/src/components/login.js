import React from 'react';

export const Login = () => (
  <form className="login-form" action="/api/login" method="POST">
    <input type="text" name="username" placeholder="name" required />
    <input type="password" name="password" placeholder="password" required />
    <input type="hidden" name="failureRedirect" value="/login" />
    <input type="hidden" name="successRedirect" value="/" />
    <button type="submit">Login</button>
  </form>
);
