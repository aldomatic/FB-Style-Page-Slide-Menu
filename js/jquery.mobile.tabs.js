/*
* jQuery Mobile Framework : "tabs" plugin
*/
(function($, undefined ) {
$.widget( "mobile.tabs", $.mobile.widget, {
	options: {
		iconpos: 'top',
		grid: null,
		load: function(event, ui) { },
		beforeTabHide: function(event, ui) { },
		beforeTabShow: function(event, ui) { },
		afterTabShow:  function(event, ui) { }
	},
	_create: function(){
		var
			$this = this,
			$tabs = this.element,
			$navbtns = $tabs.find("a"),
			iconpos = $navbtns.filter('[data-icon]').length ? this.options.iconpos : undefined;
		var $content = $tabs.closest('div[data-role="page"]').find('div[data-role="content"]');

		$tabs
			.addClass('ui-navbar')
			.attr("role","navigation")
			.find("ul")
				.grid({grid: this.options.grid });

		if( !iconpos ){ 
			$tabs.addClass("ui-navbar-noicons");
		}

		$navbtns
			.buttonMarkup({
				corners: false,
				shadow:  false,
				iconpos: iconpos
			})
			.removeClass('ui-link');

		// Set up the direct children of the page as the tab content, hide them
		$content.children().addClass('ui-tabs-content');
		
		// Now show the one that's active
		if( $navbtns.filter('.ui-btn-active').length == 0 )
			$navbtns.first().addClass('ui-btn-active');
		$content.children('#' + $navbtns.eq($this.currentTab()).attr('href')).addClass('ui-tabs-content-active');

		$navbtns.bind('click', function(event) {
			navButtonClick.call(this, event);
			return false;
		})
		.bind('tap', function(event){
			navButtonClick.call(this, event);
			return false;
		});
		
		function navButtonClick(event) {
			$navbtns.removeClass( "ui-btn-active" );
			$( this ).addClass( "ui-btn-active" );
			$this.changeTab(event, {
				currentTab: $navbtns.eq($this.currentTab()),
				nextTab: $(this),
				currentContent: $this.currentContent(),
				nextContent: $content.children($(this).attr('href'))
			});
			event.preventDefault();
		}

		this._trigger('load', null, {
			currentTab: $navbtns.eq($this.currentTab()),
			currentContent: $this.currentContent()
		});
	},
	currentTab: function() {
		var $tabs = this.element,
		$navbtns = $tabs.find("a");
		return this.element.find('.ui-btn-active').parent().prevAll().length;
	},
	currentContent: function() {
		return this.element.closest('div[data-role="page"]').find('div[data-role="content"]').children().filter('.ui-tabs-content-active');
	},
	changeTab: function(event, ui) {
		if( this._trigger('beforeTabHide', event, ui) )
			ui.currentContent.siblings().andSelf().removeClass('ui-tabs-content-active');
		if( this._trigger('beforeTabShow', event, ui) )
			ui.nextContent.addClass('ui-tabs-content-active');
		this._trigger('afterTabShow', event, $.extend({}, ui, { previousContent: ui.currentContent, currentContent: ui.nextContent, nextContent: null }));
	}
});
})( jQuery );

$(function() {
	$('[data-role=page]').live('pagecreate', function(e) {
		$(this).find('[data-role="tabs"]').tabs();
	});
});