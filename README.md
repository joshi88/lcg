import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsonData from './data.kjson';

function SearchFilter() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleDateChange = date => {
    setSelectedDate(date);
    filterData(date);
  };

  const filterData = date => {
    const filtered = jsonData.filter(item => {
      if (date) {
        return item.date === date.toISOString().slice(0, 10);
      }
      return true;
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h2>Search Filter</h2>
      <div>
        <label>Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </div>
      <button onClick={() => filterData(selectedDate)}>Search</button>
      <div>
        <h3>Filtered Events</h3>
        <ul>
          {filteredData.map(item => (
            <li key={item.id}>
              {item.title} - {item.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

namespace Drupal\your_module\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormBuilderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a custom block with a form.
 *
 * @Block(
 *   id = "your_module_custom_block",
 *   admin_label = @Translation("Custom Block with Form"),
 * )
 */
class CustomBlockWithForm extends BlockBase {

  /**
   * The form builder service.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;

  /**
   * Constructs a new CustomBlockWithForm instance.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Form\FormBuilderInterface $form_builder
   *   The form builder service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, FormBuilderInterface $form_builder) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->formBuilder = $form_builder;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('form_builder')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = $this->formBuilder->getForm('Drupal\your_module\Form\YourFormClass');
    return $form;
  }

}



