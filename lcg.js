  // Fetch all menu links.
  $menu_names = ['main-menu', 'footer-menu']; // Add your menu names here.
  foreach ($menu_names as $menu_name) {
    $menu_tree = \Drupal::menuTree();
    $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_name);

    // Build the tree according to the parameters.
    $tree = $menu_tree->load($menu_name, $parameters);

    // Transform the tree using the default manipulators.
    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $menu_tree->transform($tree, $manipulators);

    foreach ($tree as $element) {
      if ($element->access->isAllowed()) {
        $link = $element->link;
        if ($link->getUrlObject()->isRouted()) {
          $output .= generate_url_entry($link->getUrlObject()->setAbsolute());
        }
      }
    }
  }
