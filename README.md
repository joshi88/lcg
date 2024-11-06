function YOUR_MODULE_entity_presave(Drupal\Core\Entity\EntityInterface $entity) {
  // Check if entity is of content type "faa" and contains the paragraph field.
  if ($entity->getEntityTypeId() === 'node' && $entity->bundle() === 'faa') {
    // Access the paragraph field.
    if ($entity->hasField('your_paragraph_field') && !$entity->get('your_paragraph_field')->isEmpty()) {
      foreach ($entity->get('your_paragraph_field') as $paragraph_item) {
        $paragraph = $paragraph_item->entity;
        // Check if the paragraph has a file, date, and select field.
        if ($paragraph->hasField('field_upload_file') && !$paragraph->get('field_upload_file')->isEmpty()) {
          // Extract values to save.
          $file_id = $paragraph->get('field_upload_file')->target_id;
          $date_value = $paragraph->get('field_date')->value;
          $select_value = $paragraph->get('field_select')->value;

          // Insert into custom table.
          \Drupal::database()->insert('your_custom_table')
            ->fields([
              'file_id' => $file_id,
              'date_value' => $date_value,
              'select_value' => $select_value,
              'created' => REQUEST_TIME,
            ])
            ->execute();
        }
      }
    }
  }
}




use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\Entity\Node;
use Drupal\domain\Entity\Domain;

// Replace 'your_domain_id' with the actual domain ID you want to fetch nodes for.
$domain_id = 'your_domain_id'; // Replace with actual domain ID.

$content_type = 'your_content_type'; // Replace with actual content type machine name.

// Fetch all published nodes of a specific content type and specific domain.
$query = \Drupal::entityTypeManager()->getStorage('node')->getQuery();
$query->condition('type', $content_type); // Filter by content type.
$query->condition('status', Node::PUBLISHED); // Only fetch published nodes.
$query->accessCheck(TRUE); // Apply access checking.

// Join with domain_access table to filter nodes by domain.
$query->join('domain_access', 'da', 'da.entity_id = n.nid');
$query->condition('da.gid', $domain_id);

$node_ids = $query->execute();

// Load nodes based on IDs.
$nodes = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($node_ids);
