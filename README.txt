// Inside your update or insert hook
use Drupal\your_module\Event\QueueWorkerEvent;

function your_module_entity_insert(EntityInterface $entity) {
  // Check if the inserted entity is the one you want to trigger the event for.
  if ($entity->getEntityTypeId() == 'your_entity_type') {
    // Store the updated entity.
    $updated_entities[] = $entity->toArray();
  }
}

function your_module_entity_update(EntityInterface $entity) {
  // Check if the updated entity is the one you want to trigger the event for.
  if ($entity->getEntityTypeId() == 'your_entity_type') {
    // Store the updated entity.
    $updated_entities[] = $entity->toArray();
  }
}

// Dispatch the event only once after all updates
function your_module_cron() {
  if (!empty($updated_entities)) {
    $event_dispatcher = \Drupal::service('event_dispatcher');
    $event_dispatcher->dispatch(QueueWorkerEvent::NAME, new QueueWorkerEvent($updated_entities));
  }
}
