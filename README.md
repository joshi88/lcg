<?php

namespace Drupal\custom_ajax_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom block with AJAX loader.
 *
 * @Block(
 *   id = "custom_ajax_block",
 *   admin_label = @Translation("Custom AJAX Block"),
 * )
 */
class CustomAjaxBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Add the AJAX loader markup.
    $build = [
      '#markup' => '<div id="custom-ajax-loader" class="ajax-loader">Loading...</div>',
    ];

    // Attach the library that contains the AJAX loader CSS.
    $build['#attached']['library'][] = 'custom_ajax_block/ajax_loader';

    // Attach the AJAX behaviors.
    $build['#attached']['drupalSettings']['ajax']['customAjaxBlock'] = [
      'url' => \Drupal::url('custom_ajax_block.ajax_data'),
      'selector' => '#custom-ajax-loader',
    ];

    // Set the initial limit and offset values.
    $build['#attached']['drupalSettings']['ajax']['customAjaxBlock']['limit'] = 6;
    $build['#attached']['drupalSettings']['ajax']['customAjaxBlock']['offset'] = 0;

    return $build;
  }

}


ajax_loader:
  version: 1.x
  css:
    theme:
      css/ajax_loader.css: {}

custom_ajax_block.ajax_data:
  path: '/custom-ajax-data/{offset}/{limit}'
  defaults:
    _controller: '\Drupal\custom_ajax_block\Controller\CustomAjaxBlockController::getData'
    _format: json
  requirements:
    _access: 'TRUE'



<?php

namespace Drupal\custom_ajax_block\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Controller for custom AJAX block data.
 */
class CustomAjaxBlockController extends ControllerBase {

  /**
   * Returns the AJAX data.
   */
  public function getData($offset, $limit) {
    // Add your custom logic to fetch the AJAX data here.
    // $


