var SpacebookApp = function () {
  var posts = [
    {text: "AAAAAAAA", id: 0, comments:[
      { text: "A comment 1", id:0},
      { text: "A comment 2", id:1},
      { text: "A comment 3", id:2}
    ]},
    {text: "BBBBBBB", id: 1, comments:[
      { text: "B comment 1", id:3},
      { text: "B comment 2", id: 4},
      { text: "B comment 3", id: 5}
    ]},
    {text: "CCCCCC", id: 2, comments:[
      { text: "c comment 1", id: 6},
      { text: "c comment 2", id: 7},
      { text: "c comment 3", id: 8}
    ]}
  ];

  var currentId = 3;
  var currentCommentId = 9;
  var $posts = $('.posts');

  var _findPostById = function(id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var _deleteCommentById = function(id) {
    for (var i = 0; i < posts.length; i += 1) {
      for (var j =0; j < posts[i].comments.length; j++) {
        if (posts[i].comments[j].id === id) {
          posts[i].comments.splice(j, 1);
          return;
        }
      }
    }
  }

  var createPost = function(text) {
    var post = {
      text: text,
      id: currentId
    }
    currentId += 1;
    posts.push(post);
  }

  var createComment = function(currentPost, text) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    posts[posts.indexOf(post)].comments.push({text:text,id:currentCommentId});
    renderComments(currentPost);
    currentCommentId++;
  }

  var renderPosts = function() {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button>' +
      '<div class="comm"></div></div>';

      $posts.append('<br><div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + 
        '<a href="#" class="show-comments">comments</a> ' +
        post.text + commentsContainer + '</div>');
    }
  }

  var renderComments = function(currentPost) {
    $(currentPost).closest('.post').find('.comm').empty();
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    for (let element of posts[posts.indexOf(post)].comments) {
      $clickedPost.find('.comm').append('<div class="datacomm" data-id=' + element.id + '>'
       + element.text + ' <a href="#" class="removeComment">Remove</a>' + '</div');
    }
  }

  var removePost = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
    renderComments(currentPost);
  }

  var removeComment = function(currentComment) {
    var $clickedComment = $(currentComment).closest('.datacomm');
    var id = $clickedComment.data().id;
    _deleteCommentById(id);
    $clickedComment.remove();
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click','.add-comment', function () {
  var text = $(this).closest('.comments-container').find('.comment-name').val();
  app.createComment(this, text);
});

$('.posts').on('click', '.removeComment', function () {
  app.removeComment(this);
});
