use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Link;

// ...

public function build() {
  $offset = \Drupal::state()->get('custom_offset_value', 0);
  $limit = 5;

  $query = $this->database->select('your_table_name', 't')
    ->fields('t')
    ->range($offset, $limit);

  $result = $query->execute()->fetchAll();

  $output = [
    '#theme' => 'item_list',
    '#items' => $result,
  ];

  // Add a "Load More" button using AJAX.
  $offset += $limit;
  $loadMoreLink = Link::createFromRoute($this->t('Load More'), 'custom_offset.load_more', ['offset' => $offset], ['attributes' => ['class' => 'load-more-button']]);
  $output['load_more'] = [
    '#markup' => $loadMoreLink->toString(),
  ];

  return $output;
}
<?php

namespace Drupal\custom_offset\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Custom offset controller.
 */
class CustomOffsetController extends ControllerBase {

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * Constructs a new CustomOffsetController object.
   *
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   */
  public function __construct(Connection $database) {
    $this->database = $database;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('database')
    );
  }

  /**
   * AJAX callback for loading more records.
   */
  public function loadMore(Request $request) {
    $offset = $request->get('offset');
    $limit = 5;

    $query = $this->database->select('your_table_name', 't')
      ->fields('t')
      ->range($offset, $limit);

    $result = $query->execute()->fetchAll();

    $output = [
      '#theme' => 'item_list',
      '#items' => $result,
    ];

    $response = new AjaxResponse();
    $response->addCommand(new HtmlCommand('.load-more-button', $output));
    $response->addCommand(new HtmlCommand('.load-more-button', '<div class="load-more-button"></div>'));

    return $response;
  }

}
(function ($) {
  Drupal.behaviors.customOffset = {
    attach: function (context, settings) {
      $('.load-more-button a', context).once('custom-offset').click(function (event) {
        event.preventDefault();
        var url = $(this).attr('href');

        $.ajax({
          url: url,
          method: 'GET',
          dataType: 'json',
          success: function (data) {
            if (data) {
              var itemsHtml = '';
              $.each(data, function (index, item) {
                itemsHtml += '<li>' + item + '</li>';
              });
              $('.item-list', context).append(itemsHtml);
            }
          }
        });
      });
    }
  };
})(jQuery);
// ...

// Add a "Load More" button using AJAX.
$offset += $limit;
$loadMoreLink = Link::createFromRoute($this->t('Load More'), 'custom_offset.load_more', ['offset' => $offset], ['attributes' => ['class' => ['load-more-button']]]);

// Attach the library to the block.
$this->renderer->addCacheableDependency($output, $loadMoreLink);
$output['#attached']['library'][] = 'custom_offset/custom_offset';

$output['load_more'] = [
  '#markup' => $loadMoreLink->toString(),
];

// ...

