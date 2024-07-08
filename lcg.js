use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Menu\MenuLinkTreeInterface;  
// Load the menu links.
  $menu_name = 'main'; // Change this to your menu machine name
  $menu_tree_service = \Drupal::service('menu.link_tree');
  $parameters = new MenuTreeParameters();
  $tree = $menu_tree_service->load($menu_name, $parameters);

  // Transform the tree using manipulators you need.
  $manipulators = [
    ['callable' => 'menu.default_tree_manipulators:checkAccess'],
    ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
  ];
  $tree = $menu_tree_service->transform($tree, $manipulators);

  // Render the tree as a render array.
  $menu = $menu_tree_service->build($tree);

  // Now you can do something with the menu links.
  // For example, log the titles of the menu links.
  foreach ($tree as $element) {
    \Drupal::logger('custom_cron_menu')->info('Menu link: @title', ['@title' => $element->link->getTitle()]);
  }
