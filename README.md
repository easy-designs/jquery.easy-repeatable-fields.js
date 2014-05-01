jquery.easy-repeatable-fields.js
================================

Simple markup-based API for field repetition and removal.

Repeatable Fields API
---------------------

To make fields repeatable, simple add a `data-repeatable` attribute to the container:

	<li data-repeatable>
		<label for="stop-1">Stop 1</label>
		<input id="stop-1" type="text" name="stops[]">
	</li>

This script will make it so that field can be duplicated and any numeric values in
the label, id, etc. will be incremented appropriately.

If your form initializes with values that should be removable, just add a `data-removable`
attribute: 

	<li data-removable>
		<label for="stop-1">Stop 1</label>
		<input id="stop-1" type="text" name="stops[]" value="Foo">
	</li>
	<li data-repeatable>
		<label for="stop-2">Stop 2</label>
		<input id="stop-2" type="text" name="stops[]">
	</li>

This script with automatically add `data-removable` to newly created rows and manage 
creating buttons, etc. for triggering the repetition and removal.