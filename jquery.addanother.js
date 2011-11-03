/**
 * jQuery "Add Another" Plugin v1.0
 * @author Michael Peacock
 * @url www.michaelpeacock.co.uk
 * 
 * Thanks to Anthony Sterling, for his initial comments on: http://www.michaelpeacock.co.uk/blog/entry/add-another-item-with-php-and-jquery
 *
 */
(function($) {
 
	$.fn.addanother = function(table, settings) {
		
		var config = {'deletelink' : 'deleterow', 'usesheading' : true };
		
		var usestbody = ( $(table).find('thead').size() == 1 ) ? true : false;
 
		if (settings) $.extend(config, settings);
		
		// for the existing row in the table
		$('.' + config.deletelink).click(function(){
			$(this).closest("tr").remove();
			return false;
		});
		
		// click: add another
		$(this).click(function(){
			
			// duplicate the row, replace[0] with [number of rows -1] and clear the input values; use usestbody and usesheading to work out how many rows are in use! 
			$(table + ( (usestbody) ? ' > tbody > tr:first-child' : (config.usesheading) ? ' tr:eq(1)' : ' tr:first-child' ) ).clone().appendTo(table + ((usestbody) ? ' > tbody' : '') ).find('input').each(function(index, input){
                        $(input).attr('name', function(index, attr){
                            return attr.replace('[0]', '[' + ( $(table + ( (usestbody) ? ' > tbody' : '' ) ).find('tr').size()-(usestbody ? 1 : config.usesheading ? 2 : 1 )) + ']');
                        }).attr('value', null);
                    });
			// for cloned rows in the table
			$('.' + config.deletelink).click(function(){
				$(this).closest("tr").remove();
				return false;
			});
		
		});
 
		return this;
		
	};
 
})(jQuery);