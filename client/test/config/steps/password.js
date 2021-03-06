'use strict';
let assert = require('chai').assert;
let sinon = require('sinon');
let fetchMock = require('fetch-mock');

describe('Step: password', () => {

    let jsdom;
    let PasswordConfig;

    before(function () {
        jsdom = require('jsdom-global')();
        PasswordConfig = require('../../../app/config/steps/password.coffee');
    });

    after(function () {
        jsdom();
    });

    describe('#validate', () => {

        it('should return successful validation', () => {
            const data = {
                password: 'PassworD!2',
                passwordStrength: {percentage: 53.62500000000001,
                  label: 'moderate'}
            }

            let validation = PasswordConfig.validate(data)

            assert.equal(true, validation.success)
        });


        it('Should return validation errors when `data` is empty', () => {
            let validation = PasswordConfig.validate({});
            assert.equal('step password empty', validation.errors['password']);
        });


        it('Should return validation errors with `password` too weak', () => {
            const data = {
                password: 'password',
                passwordStrength: {percentage: 20.109375000000004,
                  label: 'weak'}
            }
            let validation = PasswordConfig.validate(data);

            assert.equal(
                'step password too weak',
                validation.errors['password']
            );
        });
    });


    describe('#save', () => {

        after(() => {
            fetchMock.restore();
        });

        it('should send POST request', () => {
            fetchMock.post('*', 200);
            let data = {password: 'plop',
              onboardedSteps: ['welcome', 'password']
            }
            PasswordConfig.save(data);

            assert.ok(fetchMock.called());
            assert.equal('/register/password', fetchMock.lastUrl());
            assert.deepEqual(JSON.stringify(data), fetchMock.lastOptions().body);
        });

    });
});
