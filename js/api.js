(function($) {
  'use strict';

  /**
   * Ajax-based random post fetching & History API
   * 
   */

  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    $.ajax({
       method: 'get',
       url: qod_vars.rest_url + 'wp/v2/posts/' + '?filter[orderby]=rand&filter[posts_per_page]=1',

    }).done( function(data) {
      var quotes = data.shift();

      $("article").html(quotes.content.rendered + "<p>-" + quotes.title.rendered + "</p>");

    });
 });

  /**
   * Ajax-based front-end post submissions.
   */

  // lastPage = document.URL;

  //  $(window).on("popstate", function(){
  //   window.location.replace(lastPage);
  //  });

  // history.pushState(null, null, data.slug);
     
   

})(jQuery);
