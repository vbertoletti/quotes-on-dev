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

    
      if(quotes._qod_quote_source_url.length) {
        $("article").html(
          quotes.content.rendered + 
          "<h2 class='entry-title'>-" + 
          quotes.title.rendered +
          "<a href='" + " " + quotes._qod_quote_source_url +
          "'>" +
          " " + quotes._qod_quote_source +
          "</a>" +
          "</h2>"
       
        );
        } else {
          $("article").html(
            quotes.content.rendered + 
            "<h2 class='entry-title'>-" + 
            quotes.title.rendered +
            quotes._qod_quote_source +
            "</h2>"

          )};

        
    });


 });


 

  /**
   * Ajax-based front-end post submissions.
   */

})(jQuery);
