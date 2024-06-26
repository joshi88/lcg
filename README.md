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
