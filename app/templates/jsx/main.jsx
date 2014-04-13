/** @jsx React.DOM */<% if (moduleLoader === 'browserify') { %>
'use strict';<% if (includeModernizr) { %>
require('browsernizr');<% } %>
var $ = require('jquery');
window.jQuery = $;<% if (includeUnderscore) { %>
var underscore = require('underscore');
window._ = underscore;<% } %>
var bootstrap = require('bootstrap');
/*react library*/<% if (includeReactAddons) { %>
var React = require('react/addons');<% } else { %>
var React = require('react');<% } %>
window.React = React;

/*require component for main application*/
var app = require('./components/app.jsx');
/*main application logic*/
$(document).ready(function() {
    /* App Module */
    React.renderComponent(<app />, document.getElementById('app'));
});<% } else { %>
define('main', [], function() {
    requirejs.config({
        paths: {<% if (includeModernizr) { %>
            'modernizr': '../bower_components/modernizr/modernizr',<% } if (includeReactAddons) { %>
            'react-with-addons': '../bower_components/react/react-with-addons',<% } else { %>
            'react': '../bower_components/react/react', <% } %>
            'jquery': '../bower_components/jquery/dist/jquery',<% if (includeUnderscore) { %>
            'underscore': '../bower_components/underscore/underscore',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
            'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %>
        },
        shim: {<% if (includeReactAddons) { %>
            'react-with-addons': {
                exports: 'React'
            },<% } else { %>
            'react': {
                exports: 'React'
            },<% } %><% if (includeUnderscore) { %>
            'underscore': {
                exports: '_'
            },<% } %>
            'bootstrap': ['jquery']
        }
    });

    requirejs([
        'jquery',<% if (includeReactAddons) { %>
        'react-with-addons', <% } else { %>
        'react',<% } %>
        'components/app',<% if (includeModernizr) { %>
        'modernizr',<% } %><% if (includeUnderscore) { %>
        'underscore',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
        'bootstrap'<% } %>
    ], function($, React, app) {
        'use strict';

        $(document).ready(function() {
            /* App Module */
            React.renderComponent(<app />, document.getElementById('app'));
        });
    });
});<% } %>
