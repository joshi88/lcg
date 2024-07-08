  // Fetch all menu links.
  $menu_links = \Drupal::entityTypeManager()
    ->getStorage('menu_link_content')
    ->loadMultiple();

  foreach ($menu_links as $menu_link) {
    if ($menu_link->hasTranslation($language->getId())) {
      $translated_menu_link = $menu_link->getTranslation($language->getId());
      $output .= generate_url_entry($translated_menu_link->toUrl()->setAbsolute());
    }
  }
