/**
 * Implements hook_views_query_alter().
 */
function MYMODULE_views_query_alter(ViewExecutable $view, QueryPluginBase $query) {
  // Ensure this alters the correct view and display.
  if ($view->id() == 'YOUR_VIEW_ID' && $view->current_display == 'YOUR_DISPLAY_ID') {
    // Debugging to check available query parameters.
    \Drupal::logger('mymodule')->debug('<pre>' . print_r(\Drupal::request()->query->all(), TRUE) . '</pre>');

    // Adjust the parameter names based on your filter settings.
    $search_title = \Drupal::request()->query->get('title');
    $search_body = \Drupal::request()->query->get('body');

    if ($search_title || $search_body) {
      $group = $query->setWhereGroup('AND');

      // Join the table for the `uttarakhand` paragraph.
      $query->addJoin('LEFT', 'paragraph__field_uttarakhand', 'uttarakhand', 'uttarakhand.entity_id = node_field_data.nid');

      // Join the table for the `almora` paragraph.
      $query->addJoin('LEFT', 'paragraph__field_almora', 'almora', 'almora.entity_id = uttarakhand.field_uttarakhand_target_id');

      // Join the table for the `body` field within `almora`.
      $query->addJoin('LEFT', 'paragraph__body', 'almora_body', 'almora_body.entity_id = almora.field_almora_target_id');

      if ($search_title) {
        // Filter by title in the node table.
        $query->addWhere($group, 'node_field_data', 'title', '%' . $search_title . '%', 'LIKE');
      }
      if ($search_body) {
        // Filter by body field in the `almora` paragraph.
        $query->addWhere($group, 'almora_body', 'body_value', '%' . $search_body . '%', 'LIKE');
      }
    }
  }
}
