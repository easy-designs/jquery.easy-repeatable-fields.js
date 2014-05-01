/*! Repeatable Fields (c) Aaron Gustafson (@AaronGustafson). MIT License. http://github.com/easy-designs/jquery.easy-repeatable-fields.js */

/* Repeatable Fields API
 * 
 * To make fields repeatable, simple add a `data-repeatable` attribute to the container:
 * 
 *  <li data-repeatable>
 * 		<label for="stop-1">Stop 1</label>
 * 		<input id="stop-1" type="text" name="stops[]">
 *  </li>
 * 
 * This script will make it so that field can be duplicated and any numeric values in
 * the label, id, etc. will be incremented appropriately.
 * 
 * If your form initializes with values that should be removable, just add a `data-removable`
 * attribute: 
 * 
 * 	<li data-removable>
 * 		<label for="stop-1">Stop 1</label>
 * 		<input id="stop-1" type="text" name="stops[]" value="Foo">
 * 	</li>
 * 	<li data-repeatable>
 * 		<label for="stop-2">Stop 2</label>
 * 		<input id="stop-2" type="text" name="stops[]">
 * 	</li>
 * 
 * This script with automatically add `data-removable` to newly created rows and manage 
 * creating buttons, etc. for triggering the repetition and removal.
 * 
 **/
;(function($){
	
	var tap_evt = 'click',
		$original = $('li[data-repeatable]'),
		$container = $original.parent(),
		$removable = $container.find('[data-removable]'),
		$remove = $('<button class="remove" type="button">Remove</button>'),
		$add = $('<button class="add" type="button">Add Another</button>'),
		$model = $original
					.append( $add )
					.clone(),
		count_regex = /(.*)(\d+)(.*)/;
	
	if ( 'touchend' in window )
	{
		tap_evt = 'touchend';
	}
	
	$container.on( tap_evt, 'button.remove', function(e){
		$(this).closest('[data-removable]').remove();
	});
	
	$container.on( tap_evt, 'button.add', function(e){
		var $this = $(this).closest('[data-repeatable]'),
			$labels = $this.find('label'),
			$clone = $model.clone();

		$this
			.hide()
			.removeAttr('data-repeatable')
			.attr('data-removable','')
			.append( $remove.clone() )
			.find('button.add')
				.remove()
				.end()
			.find('label')
				.each(function(i){
					var $label = $(this),
						id = $label.attr('for'),
						id_bits = $label.attr('for').match(count_regex),
						id_increment = parseInt(id_bits[2],10) + 1,
						label_bits = $label.text().match(count_regex),
						label_increment = parseInt(label_bits[2],10) + 1;

					console.log(i,$model.find('label:eq('+i+')'));

					$clone
						.find('label:eq('+i+')')
							.text( label_bits[1] + label_increment + label_bits[3] )
							.attr( 'for', id_bits[1] + id_increment + id_bits[3] )
							.end()
						.find('#' + id)
							.attr('id', id_bits[1] + id_increment + id_bits[3]);
				 })
				.end()
			.show();
		
		$container.append( $clone );

	});
	
	
}(jQuery));