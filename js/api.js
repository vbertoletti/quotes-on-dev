(function($) {
  'use strict';

  /**
   * Ajax-based random post fetching & History API
   * 
   */
  var lastPage = "";
  

  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();
    
    $.ajax({
       method: 'get',
       url: qod_vars.rest_url + 'wp/v2/posts/' + '?filter[orderby]=rand&filter[posts_per_page]=1',

    }).done( function(data) {
      var quotes = data.shift();
      lastPage = document.URL;

      history.pushState(null, null, qod_vars.home_url + "/" + quotes.slug);

      $(window).on("popstate", function(){
        window.location.replace(lastPage);
      });

      $(".entry-content").html(quotes.content.rendered);
      $(".entry-title").text("- " + quotes.title.rendered);

      if(quotes._qod_quote_source_url.length) {
        $(".source").html(", " + "<a href='" + quotes._qod_quote_source_url + "'>" + quotes._qod_quote_source + "</a>");

      } else if (quotes._qod_quote_source.length)  {
        $(".source").text(", " + quotes._qod_quote_source);

      };    
    });

 });

  /**
   * Ajax-based front-end post submissions.
   */

  $('#submit-button-send-quote').on('click', function(event) {
    event.preventDefault();

    $.ajax({
       method: 'post',
       url: qod_vars.rest_url + 'wp/v2/posts/',
       data: {
          title: $("#quote-author").val(),
          content: $("#quote-content").val(),
          _qod_quote_source: $("#quote-source").val(),
          _qod_quote_source_url: $("#quote-source-url").val()
       },
       beforeSend: function(xhr) {
          xhr.setRequestHeader( 'X-WP-Nonce', qod_vars.wpapi_nonce );
       }
    }).done( function() {
       $("#quote-submission-form").slideUp();
       $(".submit-success-message").text(
         qod_vars.success
       ).show();

    })
    .fail( function() {
      alert(qod_vars.failure);
    });
 });










})(jQuery);
