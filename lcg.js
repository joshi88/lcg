  $menu_names = ['main-menu', 'footer-menu']; // Add your menu names here.
  foreach ($menu_names as $menu_name) {
    $menu_tree_service = \Drupal::service('menu.link_tree');
    $parameters = new MenuTreeParameters();
    $tree = $menu_tree_service->load($menu_name, $parameters);

    // Transform the tree using manipulators you need.
    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $menu_tree_service->transform($tree, $manipulators);

    // Process the menu links and add them to the sitemap.
    foreach ($tree as $element) {
      if ($element->access->isAllowed()) {
        $link = $element->link;

        // Check if the menu link belongs to the current domain.
        $menu_link_content = \Drupal::entityTypeManager()->getStorage('menu_link_content')->load($link->getPluginId());
        if ($menu_link_content && $menu_link_content->get('domain_access')->target_id == $current_domain_id) {
          // Check if the menu link translation exists for this language.
          if ($menu_link_content->hasTranslation($language->getId())) {
            $translated_link = $menu_link_content->getTranslation($language->getId());
            $output .= generate_url_entry($translated_link->toUrl()->setAbsolute());
          }
        }
      }
    }
  }
