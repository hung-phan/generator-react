/** @jsx React.DOM */<% if (moduleLoader === 'browserify') { %>
'use strict';
var $ = require('jquery');
window.jQuery = $;<% if (includeLodash) { %>
var lodash = require('lodash');
window._ = lodash;<% } %>
var bootstrap = require('./../bower_components/sass-bootstrap/dist/js/bootstrap');
/*react library*/<% if (includeReactAddons) { %>
var React = require('react/addons');<% } else { %>
var React = require('react');<% } %>

/*require director to handle routing on client-side*/
var director = require('./../bower_components/director/build/director');

/*require component for main application*/
var app = require('./components/app.jsx');
/*main application logic*/
$(document).ready(function() {
    /* App Module */

    /*doc for routing https://github.com/flatiron/director*/
    var routes = {
        '/': function() {
            React.renderComponent(<app /> , document.getElementById('route'));
        }
    };
    var routerHandler = new director.Router(routes);
    routerHandler.init('/');
});<% } else { %>
require([
    'jquery',<% if (includeReactAddons) { %>
    'react-with-addons',<% } else { %>
    'react',<% } %>
    'components/app',
    'director',<% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($, React, app) {
    'use strict';

    $(document).ready(function() {
        /* App Module */

        /*doc for routing https://github.com/flatiron/director*/
        var routes = {
            '/': function() {
                React.renderComponent(<app /> , document.getElementById('route'));
            }
        };
        var routerHandler = new Router(routes);
        routerHandler.init('/');
    });
});<% } %>
