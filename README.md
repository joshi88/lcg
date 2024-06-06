/**
 * Implements hook_views_pre_render().
 */
function MYMODULE_views_pre_render(ViewExecutable $view) {
  // Ensure this alters the correct view and display.
  if ($view->id() == 'YOUR_VIEW_ID' && $view->current_display == 'YOUR_DISPLAY_ID') {
    $search_term = \Drupal::request()->query->get('body');
    if ($search_term) {
      // Loop through the results and filter based on the search term.
      foreach ($view->result as $index => $row) {
        if (strpos(strtolower($row->_entity->get('body')->value), strtolower($search_term)) === false) {
          // If the search term is not found, remove this result.
          unset($view->result[$index]);
        }
      }
      // Reindex array keys to avoid gaps.
      $view->result = array_values($view->result);
    }
  }
}
