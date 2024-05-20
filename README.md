
<script>
  (function($, Drupal) {
    Drupal.behaviors.myBehavior = {
      attach: function (context, settings) {
        var myValue = 'abc vlaue'
        console.log('Value from Twig: ', myValue);
      }
    };
  })(jQuery, Drupal);
</script>


{{ drupalSettings.modulename.myVlaue }}
