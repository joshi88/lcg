use Drupal\node\NodeInterface;

// Load the node revision by its revision ID.
$revision_id = 123; // Replace with the actual revision ID.
$node_revision = \Drupal::entityTypeManager()->getStorage('node')->loadRevision($revision_id);

// Check if the loaded entity is a NodeInterface.
if ($node_revision instanceof NodeInterface) {
  // Get the moderation state for the node revision.
  $moderation_state = $node_revision->get('moderation_state')->target_id;

  // Load the moderation state entity to get additional information if needed.
  $moderation_state_entity = \Drupal::entityTypeManager()->getStorage('moderation_state')->load($moderation_state);

  if ($moderation_state_entity) {
    $moderation_state_label = $moderation_state_entity->label();
    // You can now use $moderation_state_label or $moderation_state for your needs.
  }
}

