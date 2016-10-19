StepView = require '../step'

module.exports = class PasswordView extends StepView

    template: require '../templates/view_steps_password'

    events:
        'click button': 'onSubmit'


    # Get 1rst error only
    # err is an object such as:
    # { type: 'password', text:'step empty fields'}
    serializeData: () ->
        data = {}

        if (err = @errors)? and 'object' is typeof err
            err = err.shift() if err.length

            # Get Server Password Error
            text = err.errors?.password

            # otherwhise get client error (ie. empty case)
            text ?= t err.text, {name: err.error}

            # otherwhise get basic server error
            text ?= err.trans

            Object.assign data, { error: text }

        Object.assign(data, {
            stepName: @model.get 'name'
            figureid: require '../../assets/sprites/illustrate-password.svg'
        })


    getDataFromDOM: ->
        return {
            password: @$('input[name=password]').val()
            onboardedSteps: ['welcome', 'agreement', 'password']
        }


    onSubmit: (event)->
        event?.preventDefault()

        @model.submit @getDataFromDOM()
