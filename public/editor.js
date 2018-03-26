var id = undefined;

$(document).ready(() => {
  $("form.blog-post-editor").submit(e => {
    e.preventDefault();
    if (id) update();
    else create();
    return false;
  });

  $("#delete-button").click(() => {
    console.log("delete");
    const sure = confirm("Are you sure?");
    if (sure)
      fetch(`api/posts/${id}`, {
        method: "DELETE"
      }).then(response => {
        if (response.ok) showCreationForm();
        else alert("deletion failed");
      });
  });

  fetch("api/loggedin", { credentials: "same-origin" })
    .then(response => response.json())
    .then(data => {
      if (data.isAuthenticated) load();
      else {
        console.log("not logged in");
        $("#main").html(
          `<div class="message error-message">You need to log in to edit blog posts<br /><a href="login.html">Login</a></div>`
        );
      }
    });
});

function load() {
  id = urlParams().id;
  const post = fetch(`/api/posts/${id}`)
    .then(response => {
      if (response.ok) return response.json();
      else undefined;
    })
    .then(post => {
      if (post) showPost(post);
      else showCreationForm();
    });
}

function showPost(post) {
  id = post.id;
  history.pushState({}, "", "edit.html?id=" + id);
  $("#header").text(`Edit Post ${id}`);
  $("#post-title").val(post.title);
  $("#post-date").val(post.date);
  $("#post-content").val(post.content);
}

function showCreationForm() {
  id = undefined;
  history.pushState({}, "", "edit.html");
  $("#post-title").val("");
  $("#post-date").val(new Date().toISOString().substring(0, 10));
  $("#post-content").val("");
  $("#header").text(`Create new Post`);
}

function update() {
  const values = { ...getFormValues(), id };
  fetch(`api/posts/${id}`, {
    method: "PUT",
    credentials: "same-origin",
    body: JSON.stringify(values),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(response => {
    if (!response.ok) alert("update failed");
    else alert("update successfully done");
  });
}

function create() {
  const values = getFormValues();
  fetch(`api/posts`, {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(values),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(response => {
    if (!response.ok) alert("creation failed");
    else {
      alert("update successfully done");
      response.json().then(post => showPost(post));
    }
  });
}

function getFormValues() {
  const title = $("#post-title").val();
  const date = $("#post-date").val();
  const content = $("#post-content").val();
  return { title, date, content };
}

function urlParams() {
  const url = decodeURIComponent(window.location.search.substring(1));
  const params = {};
  url
    .split("&")
    .map(item => item.split("="))
    .map(arr => ({ name: arr[0], value: arr[1] }))
    .forEach(item => (params[item.name] = item.value));
  return params;
}