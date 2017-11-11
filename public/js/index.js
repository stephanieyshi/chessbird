$(function () {
  // Grab the template script
  var theTemplateScript = $("#board-template").html();
  console.log(theTemplateScript);

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context = {
      board : '<div id="board" style="width: 400px"></div>'
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);
  console.log(theCompiledHtml);

  // Add the compiled html to the page
  $('.content-placeholder').html(theCompiledHtml);
    
  var board = ChessBoard('board');
});