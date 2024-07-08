  // Fetch all menu links for a specific domain.
  $domain_id = 'example.com'; // Replace with your domain ID.
  $menu_names = ['main-menu', 'footer-menu']; // Add your menu names here.
  foreach ($menu_names as $menu_name) {
    $menu_tree = \Drupal::menuTree();
    $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_name);

    // Load the menu tree for the specified domain.
    $tree = $menu_tree->load($menu_name, $parameters);

    // Filter menu links by domain.
    foreach ($tree as $element) {
      $menu_link_content = \Drupal::entityTypeManager()->getStorage('menu_link_content')->load($element->link->getPluginId());
      if ($menu_link_content && $menu_link_content->get('domain_access')->target_id == $domain_id) {
        if ($element->access->isAllowed()) {
          $link = $element->link;
          if ($link->getUrlObject()->isRouted()) {
            $output .= generate_url_entry($link->getUrlObject()->setAbsolute());
          }
        }
      }
    }
  }
