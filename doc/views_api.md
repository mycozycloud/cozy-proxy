
## `StateComponent` API

<pre>
&lt;class&gt; StateComponent extends Backbone.BaseView

    state: new ProxyState()

	initialize: (props) ->

		// Here is a Backbone listener
		// see how to do this with bacon stream listener
		// Bacon methods and observable could help :
		// `Bacon.fromEvent`, `observable.subscribe` etc.

		@listenTo(props.model, 'change', @render)


	// Dispatched after 1rst render
	onStart: ->
		// ...


	// Dispatched after all render
	onEnd: ->
		// ...


    // Dispatched after success request
    onSuccess: ->
        // ...


	// Dispatched after all error
	onError: (err) ->
        message = Getter.getErrorTitle(err)
        @setState { error: message }


	// Dispatched after hiding component
	onBackground: ->
		// ...


	// Dispatched before removing component
	onRemove: ->
		// ...


    validate: () ->
        data = @getFormData()
        return @state.validate(data)


    send: ->
        var input = @getFormData()
        if ( output = @state.validate(input) )
            // Send data to server
            // ie. Use Bacon or basics XHR methods?
            DATA.send
                data: output
            ,
                success: @onSuccess
                error: @onError
        else
            @onError 'invalid'


	// Return markdown that will be
	// add to the HTML document
	render: () ->
		return &lt;markup&gt;

</pre>

<pre>
&lt;class&gt; Component extends StateComponent

	// Inspired from `React.PropTypes`
	// Important to describe state
	// and to understand what is needed in one look

	&lt;object&gt; stateTypes: {
		'userID': `string.required`
		'userName': `string`
		'is_registered': `boolean`
	}


	&lt;object&gt; state


	// Listen to this model
	// to update component
	// throw `compenent.render()`

	&lt;model&gt; model : user


</pre>