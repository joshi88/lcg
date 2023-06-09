<?php

namespace Drupal\custom_ajax_block\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Controller for custom AJAX block data.
 */
class CustomAjaxBlockController extends ControllerBase {

  /**
   * The current request.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  protected $request;

  /**
   * Constructs a new CustomAjaxBlockController object.
   *
   * @param \Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   The request stack.
   */
  public function __construct(RequestStack $request_stack) {
    $this->request = $request_stack->getCurrentRequest();
  }

  /**
   * Returns the AJAX data.
   */
  public function getData($offset, $limit) {
    // Add your custom logic to fetch the AJAX data here.
    $results = [];

    // Example code: Fetch 6 records from a database table.
    $query = \Drupal::database()->select('mytable', 'mt');
    $query->fields('mt', ['id', 'name']);
    $query->range($offset, $limit);
    $data = $query->execute()->fetchAll();

    // Format the data as needed.
    foreach ($data as $item) {
      $results[] = [
        'id' => $item->id,
        'name' => $item->name,
      ];
    }

    return new JsonResponse($results);
  }

}

/**
   * {@inheritdoc}
   */
  public function build() {
    // Get the current request.
    $request = \Drupal::requestStack()->getCurrentRequest();

    // Get the offset and limit values from the request parameters.
    $offset = $request->get('offset', 0);
    $limit = $request->get('limit', 6);

    // Add the AJAX loader markup.
    $build = [
      '#markup' => '<div id="custom-ajax-loader" class="ajax-loader">Loading...</div>',
    ];

    // Attach the library that contains the AJAX loader CSS.
    $build['#attached']['library'][] = 'custom_ajax_block/ajax_loader';

    // Attach the AJAX behaviors.
    $build['#attached']['drupalSettings']['ajax']['customAjaxBlock'] = [
      'url' => \Drupal::url('custom_ajax_block.ajax_data', [
        'offset' => $offset,
        'limit' => $limit,
      ]),
      'selector' => '#custom-ajax-loader',
    ];

    // Set the initial limit and offset values.
    $build['#attached']['drupalSettings']['ajax']['customAjaxBlock']['limit'] = $limit;
    $build['#attached']['drupalSettings']['ajax']['customAjaxBlock']['offset'] = $offset;

    return $build;
  }





LCG (login cum registration).
With the help of this module user can login and register from single form in drupal 7.

This Module Developed by Amit Joshi.
For more help please contact me
Email:amitkjoshi88@gmail.com

====================================================


HOW TO USE:

I. FOR NORMAL USERS

1. Underneath user-interface lcg options are available. 

