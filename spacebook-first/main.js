var posts = [];
var comments = [];
var id = 0;

function getDataFromView() {
    let text = $('#post-name').val();
    id++;
    return { id, text };
}

function addPost(post) {
    let newPost = { id: post.id, text: post.text };
    posts.push(newPost);
}

function renderPosts() {
    $('.posts').children().remove();// clearing posts
    let buttonRemove = '<button type="button" class="remove">REMOVE</button>';
    let buttonComment = '<button type="button" class="comment">COMMENT</button>';
    let commentForm = '<div class="input-group"><input type="text" id="comment-text" class="form-control1" placeholder="Your comment">';
    commentForm += '<input type="text" id="comment-name" class="form-control1" placeholder="Your name">';
    commentForm += '<button type="button" class="sendComment">SEND</button></div>';
    for (let element of posts) {
        $('.posts').append('<div class="datadiv" data-id="' + element.id + '">' + element.text + 
        '  ' + buttonRemove + " " + buttonComment + commentForm + '</div>');
    }
    bindRemove();
    bindComment();
}

var bindRemove = function () {
    $('.remove').on( "click", function() {
        id = $(this).closest("div").data().id;
        $(this).closest("div").remove();
        removePostbyID(id);
      });
    }

function removePostbyID(id) {
    var i = 0;
    while (i < posts.length && posts[i].id != id)  {
        i++;
    }
    if (i < posts.length) {
        posts.splice(i, 1); 
    }
}

var bindComment = function () {
    $('.comment').on( "click", function() {
       $(this).closest("div").find(".input-group").toggle();
     });
    }
  

$('.add-post').on('click', function () {
    const post = getDataFromView();
    addPost(post);
    renderPosts();
    //clearView();
});
