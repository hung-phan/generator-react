/** @jsx React.DOM */<% if (moduleLoader === 'browserify') { %>
'use strict';
var $ = require('jquery');
window.jQuery = $;<% if (includeLodash) { %>
var lodash = require('lodash');
window._ = lodash;<% } %>
require('bootstrap');
/*react library*/<% if (includeReactAddons) { %>
var React = require('react/addons');<% } else { %>
var React = require('react');<% } %>

/*require director to handle routing on client-side*/
var director = require('director');

/*require fluxxor*/
var Fluxxor = require('fluxxor');

/*require component for main application*/
var app = require('./app/app.jsx');
/*main application logic*/
$(document).ready(function() {
    /* App Module */
    var routeDOMElement = document.getElementById('route');

    /*doc for routing https://github.com/flatiron/director*/
    var routes = {
        '/': function() {
            React.render(<app /> , routeDOMElement);
        }
    };
    var routerHandler = new director.Router(routes);
    routerHandler.init('/');
});<% } else { %>
require([
    'jquery',<% if (includeReactAddons) { %>
    'react-with-addons',<% } else { %>
    'react',<% } %>
    'app/app',
    'director',<% if (includeFluxxor) { %>
    'Fluxxor',<% } %><% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($, React, app) {
    'use strict';

    $(document).ready(function() {
        /* App Module */
        var routeDOMElement = document.getElementById('route');

        /*doc for routing https://github.com/flatiron/director*/
        var routes = {
            '/': function() {
                React.render(<app /> , routeDOMElement);
            }
        };
        var routerHandler = new Router(routes);
        routerHandler.init('/');
    });
});<% } %>
