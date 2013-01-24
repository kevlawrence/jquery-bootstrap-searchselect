jQuery Bootstrap SearchSelect
=============================

SearchSelect is a jQuery plugin that utilizes Bootstrap's Typeahead plugin to create a searchable selection field for your forms.

Demo
----

Coming soon.

Usage
-----

First, we need a tiny bit of HTML. It's very simple, all we need is an empty div that we can reference.

    <div id="users"></div>

And second, the jQuery to get it going.

    $('#users').searchSelect({
			url: 'users/search',
			inputName: 'nameOfField',
			placeholderText: 'Name, title...',
			displayFormat: "item.name+' - '+item.title",
			editable: true,
			defaultDisplay: "Richard Branson",
			defaultValue: 1
		});

An example output from the `users/search` url above, which you need to implement on your server side.

    [
      {
        "id":1,
        "name":"Richard Branson",
        "title":"Founder"
      },
      {
        "id":2,
        "name":"Mick Jagger",
        "title":"Employee"
      }
    ]

How It Works
------------

SearchSelect will produce a textfield. When the user types in this textfield, it uses Bootstrap's Typeahead plugin to call the `url` for search results. When the user selects one of the provided options, it will populate a div above the textfield in the format described in `displayFormat`, and it will populate a hidden field named by the `inputName` parameter.
