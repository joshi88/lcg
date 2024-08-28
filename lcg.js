.views-exposed-widgets .bef-link a:contains("Any") {
    display: none;
}
(function ($) {
  $(document).ready(function () {
    // Initially hide the "False" link
    var falseLink = $('.views-exposed-widgets .bef-link a:contains("False")');
    var trueLink = $('.views-exposed-widgets .bef-link a:contains("True")');
    
    falseLink.hide();
    
    // When the "True" link is clicked
    trueLink.click(function (e) {
      e.preventDefault();
      
      // If True is active, show False and hide True
      if ($(this).hasClass('active')) {
        $(this).removeClass('active').hide();
        falseLink.addClass('active').show();
        $('input[name="combine"]').val('0');  // Set filter value to false
      } else {
        $(this).addClass('active');
        $('input[name="combine"]').val('1');  // Set filter value to true
      }
      
      // Trigger the AJAX submission
      $('.views-exposed-form').trigger('submit');
    });

    // When the "False" link is clicked
    falseLink.click(function (e) {
      e.preventDefault();
      
      // If False is active, show True and hide False
      if ($(this).hasClass('active')) {
        $(this).removeClass('active').hide();
        trueLink.addClass('active').show();
        $('input[name="combine"]').val('1');  // Set filter value to true
      } else {
        $(this).addClass('active');
        $('input[name="combine"]').val('0');  // Set filter value to false
      }
      
      // Trigger the AJAX submission
      $('.views-exposed-form').trigger('submit');
    });
  });
})(jQuery);

