var id = undefined;

$(document).ready(() => {
  $('form.blog-post-editor').submit(e => {
    e.preventDefault();
    update();
    return false;
  });

  id = urlParams().id;
  const post = fetch(`/api/posts/${id}`)
    .then(response => {
      if (response.ok) return response.json();
      else undefined;
    })
    .then(post => {
      if (post) showPost(post);
    });
});

function showPost(post) {
  $('#post-title').val(post.title);
  $('#post-date').val(post.date);
  $('#post-content').val(post.content);
}

function update() {
  const title = $('#post-title').val();
  const date = $('#post-date').val();
  const content = $('#post-content').val();
  fetch(`api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, title, date, content })
  }).then(response => {
    if (!response.ok) alert('update failed');
    else alert('update successfully done');
  });
}

function urlParams() {
  const url = decodeURIComponent(window.location.search.substring(1));
  const params = {};
  url
    .split('&')
    .map(item => item.split('='))
    .map(arr => ({ name: arr[0], value: arr[1] }))
    .forEach(item => (params[item.name] = item.value));
  return params;
}
