var SpacebookApp = function () {
  var postsData ={posts: [
    {text: "AAAAAAAA", id: 0, statusOpen: false, comments:[
      { text: "A comment 1", id:0},
      { text: "A comment 2", id:1},
      { text: "A comment 3", id:2}
    ]},
    {text: "BBBBBBB", id: 1, statusOpen: false, comments:[
      { text: "B comment 1", id:3},
      { text: "B comment 2", id: 4},
      { text: "B comment 3", id: 5}
    ]},
    {text: "CCCCCC", id: 2, statusOpen: false, comments:[
      { text: "c comment 1", id: 6},
      { text: "c comment 2", id: 7},
      { text: "c comment 3", id: 8}
    ]}
  ]};

  var currentId = 3;
  var currentCommentId = 9;
  var $posts = $('.posts');

  var _findPostById = function(id) {
    for (var i = 0; i < postsData.posts.length; i++) {
      if (postsData.posts[i].id === id) {
        return postsData.posts[i];
      }
    }
  }

  var _deleteCommentById = function(id) {
    for (var i = 0; i < postsData.posts.length; i ++) {
      for (var j =0; j < postsData.posts[i].comments.length; j++) {
        if (postsData.posts[i].comments[j].id === id) {
          postsData.posts[i].comments.splice(j, 1);
          return;
        }
      }
    }
  }

  var _getIndexOfCurrentPost = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    return postsData.posts.indexOf(post);
  }

  var createPost = function(text) {
    var post = {
      text: text,
      id: currentId,
      statusOpen: false,
      comments:[]
    }
    currentId += 1;
    postsData.posts.push(post);
  }

  var createComment = function(currentPost, text) {
    var index = _getIndexOfCurrentPost(currentPost);
    postsData.posts[index].comments.push({text:text,id:currentCommentId});
    currentCommentId++;
  }

  var renderPosts = function() {
    $posts.empty();
    var source = $('#spacebook-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(postsData);
    $('.posts').append(newHTML);
    
  }

  var removePost = function(currentPost) {
    var index = _getIndexOfCurrentPost(currentPost);
    postsData.posts.splice(index, 1);
  }

  var removeComment = function(currentComment) {
    var $clickedComment = $(currentComment).closest('.datacomm');
    var id = $clickedComment.data().id;
    _deleteCommentById(id);
  }

  var toggleComments = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var index = _getIndexOfCurrentPost(currentPost);
    postsData.posts[index].statusOpen ^= true;
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
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
  app.renderPosts();
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this); 
});

$('.posts').on('click','.add-comment', function () {
  var text = $(this).closest('.comments-container').find('.comment-name').val();
  app.createComment(this, text);
  app.renderPosts();
});

$('.posts').on('click', '.removeComment', function () {
  app.removeComment(this);
  app.renderPosts();
});
