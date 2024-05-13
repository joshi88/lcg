// Inside your update or insert hook
use Drupal\your_module\Event\QueueWorkerEvent;

function your_module_entity_insert(EntityInterface $entity) {
  // Check if the inserted entity is the one you want to trigger the event for.
  if ($entity->getEntityTypeId() == 'your_entity_type') {
    $event_dispatcher = \Drupal::service('event_dispatcher');
    $event_dispatcher->dispatch(QueueWorkerEvent::NAME, new QueueWorkerEvent([$entity->toArray()]));
  }
}

function your_module_entity_update(EntityInterface $entity) {
  // Check if the updated entity is the one you want to trigger the event for.
  if ($entity->getEntityTypeId() == 'your_entity_type') {
    $event_dispatcher = \Drupal::service('event_dispatcher');
    $event_dispatcher->dispatch(QueueWorkerEvent::NAME, new QueueWorkerEvent([$entity->toArray()]));
  }
}
