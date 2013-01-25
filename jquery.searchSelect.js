/*
 * jQuery SearchSelect
 * Version 0.1
 * https://github.com/kevlawrence/jquery-bootstrap-searchselect
 *
 * Copyright (c) 2013 Kevin Lawrence
 * Licensed under the MIT license.
*/

(function($) {
	
	var methods = {
		init : function(options) {
			if (options.url == null) $.error('SearchSelect needs a url parameter.');

			var settings;
			var html = {
				container: null,
				q: null,
				selected: null,
				input: null,
				display: null,
				close: null
			}
			
			settings = $.extend({}, $.fn.searchSelect.defaults, options);
			html.container = this;
			
			setupHtml();
			setupSelection();
			
			if (settings.defaultValue != null && settings.defaultDisplay != null) {
				setValue(settings.defaultValue, settings.defaultDisplay);
			}
			
			/***** PRIVATE *****/
			function setupHtml() {
				html.q = $('<input />').attr('type', 'text').addClass('q').attr('placeholder', settings.placeholderText);
				html.selected = $('<div />').addClass('searchSelect-selected alert');
				html.display = $('<span />').addClass('searchSelect-display').html(name);
				html.close = $('<button />').attr('type', 'button').addClass('searchSelect-close close').html('×');
				html.close.click(function() {
					html.selected.slideUp();
					html.input.val('');
				});
				
				html.container.append(html.selected);
				html.container.append(html.q);
				
				if (settings.editable == true) {
					html.selected.append(html.close);
					
					html.input = $('<input />').attr('type', 'hidden').attr('name', settings.inputName).addClass('searchSelect-input');
					html.container.append(html.input);
				} else {	
					html.q.attr('disabled', 'disabled');
				}
				
				html.selected.append(html.display);
				html.selected.hide();
			}

			function setupSelection() {
				html.q.typeahead({
					source:function (query, process) {
					    $.ajax({
				        	data: 'q=' + query,
				        	dataType: 'json',
				        	type: 'get',
				        	url: settings.url,
							success: function(data) {
						      labels = [];
						      mapped = {};

						      $.each(data.expected, function (i, item) {
						        mapped[eval(settings.displayFormat)] = item;
						        labels.push(eval(settings.displayFormat));
						      });

						      process(labels);
							}
					    });
					},
				    updater: function(name) {
						var item = mapped[name];
						
						setValue(item.id, eval(settings.displayFormat));

						return name;
				    }
				});
			}

			function setValue(value, display) {
				html.selected.show();
				html.display.html('<strong>'+display+'</strong>');
				
				if (settings.editable == true) {
					html.input.val(value);
				}
			}
		}
	}
	
	$.fn.searchSelect = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.sandbar');
		}
	};
	
	$.fn.searchSelect.defaults = {
		url: null,
		inputName: null,
		defaultDisplay: null,
		defaultValue: null,
		displayFormat: 'item.name',
		valueFormat: 'item.id',
		placeholderText: null,
		editable: true,
		onTypeFunc: null,
		onSelectFunc: null
	};
})(jQuery);