use Drupal\Core\Block\BlockBase;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Menu\MenuLinkTreeInterface;

/**
 * Provides a 'CustomMenuBlock' block.
 *
 * @Block(
 *   id = "custom_menu_block",
 *   admin_label = @Translation("Custom Menu Block"),
 * )
 */
class CustomMenuBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $menu_name = 'main'; // Change this to your menu machine name

    $menu_tree = \Drupal::menuTree();
    $parameters = new MenuTreeParameters();
    $tree = $menu_tree->load($menu_name, $parameters);

    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $menu_tree->transform($tree, $manipulators);
    $menu = $menu_tree->build($tree);

    return $menu;
  }
}
