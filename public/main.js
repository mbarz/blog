$(document).ready(() => {
  loadList().then(list => showList(list));
});

function loadList() {
  return fetch("api/posts").then(response => response.json());
}

function showList(list) {
  list.sort((p1, p2) => {
    const d1 = new Date(p1.date).getTime();
    const d2 = new Date(p2.date).getTime();
    return d1 - d2;
  });
  for (post of list) {
    printPost(post);
  }
  Prism.highlightAll();
}

function printPost(post) {
  const main = $("#main");
  const postDiv = $('<div class="blog-post">');

  const header = $("<header>");
  header.html(`<h1>#${post.id} ${post.date} ${post.title}</h1>`);
  postDiv.append(header);

  const contentDiv = $("<div>");
  contentDiv.html(marked(post.content));
  postDiv.append(contentDiv);

  main.prepend(postDiv);
}
