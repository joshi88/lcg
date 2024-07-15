$menu_link_tree = \Drupal::service('menu.link_tree');
$menu_link_manager = \Drupal::service('plugin.manager.menu.link');
$renderer = \Drupal::service('renderer');
$home_url = Url::fromRoute('<front>')->toString();
// Define the menu name you want to work with.
$menu_name = 'top-menu';

// Create menu tree parameters.
$parameters = new MenuTreeParameters();
$parameters->setMaxDepth(2); // Set the desired depth.

// Load the menu tree.
$tree = $menu_link_tree->load($menu_name, $parameters);

// Transform the tree using manipulators you can find in the menu.link_tree service.
$manipulators = [
  ['callable' => 'menu.default_tree_manipulators:checkAccess'],
  ['callable' => 'domain_menu_access.default_tree_manipulators:checkDomain'],
  ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
];
$tree = $menu_link_tree->transform($tree, $manipulators);

// Traverse and manipulate the tree.
foreach ($tree as $key => $element) {
  $link = $element->link;
  $subtree = $element->subtree;
  if($home_url != $link->getUrlObject()->toString()){
    $output .= $this->generateUrlEntry($link->getUrlObject()->setAbsolute(TRUE));
  }

  if (!empty($subtree)) {
    foreach ($subtree as $sub_element) {
      if($home_url != $sub_element->link->getUrlObject()->toString()){
        $output .= $this->generateUrlEntry($sub_element->link->getUrlObject()->setAbsolute(TRUE));
      }
    }
  }
}
