describe("app.createPost", function() {
  it("should receive text", function() {
    //var app = SpacebookApp();
    var text = "yyy"
    app.createPost(text);
    var lastPost = app.posts[posts.length - 1].text;

    //var expectedResult = 10;

    //var actualResult = addNumbers(firstNum, secondNum);

    expect(lastPost).toBe(text);
  });
});
