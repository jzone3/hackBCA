(function() {
  var quotesAPI = "http://cors.io/closings.victorlourng.com/quotes/";
  $.getJSON(quotesAPI, {
    format: "json"
  })
    .done(function(data) {
      console.log(data.quote);
      $('footer blockquote span').html( data.quote );
      $('footer blockquote small').html( data.author );
    });
})();
