use Symfony\Component\Finder\Finder;
use Symfony\Component\Filesystem\Filesystem;
use Drupal\your_module\Event\QueueWorkerEvent;

function your_module_cron() {
    $folder_path = 'path/to/folder';
    $cron_run_time = \Drupal::time()->getRequestTime();

    // Check if the event has been dispatched.
    $event_dispatched = \Drupal::state()->get('your_module.event_dispatched', FALSE);

    // Check if the file exists in the folder.
    $finder = new Finder();
    $finder->files()->in($folder_path);

    if ($finder->hasResults() && !$event_dispatched) {
        // Dispatch an event if the file exists and the event hasn't been dispatched yet.
        $event_dispatcher = \Drupal::service('event_dispatcher');
        $event_dispatcher->dispatch(QueueWorkerEvent::NAME);

        // Set the flag to indicate that the event has been dispatched.
        \Drupal::state()->set('your_module.event_dispatched', TRUE);
    }

    if (!$finder->hasResults() && $event_dispatched) {
        // Reset the flag if no files are found.
        \Drupal::state()->set('your_module.event_dispatched', FALSE);
    }

    // Remove files older than 5 minutes from the cron run.
    foreach ($finder as $file) {
        if ($file->getMTime() < ($cron_run_time - 300)) { // 300 seconds = 5 minutes
            $filesystem = new Filesystem();
            $filesystem->remove($file->getRealPath());
        }
    }
}
