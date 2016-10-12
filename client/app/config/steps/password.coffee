$ = require 'jQuery'

module.exports = {
    name: 'password',
    route: 'password',
    view : 'steps/password'

    # If OK, return null
    # if not return an Array of errors
    validate: (data) ->
        return null

    submit: (data) ->
        data = JSON.stringify data
        $.post('/register', data)
}
