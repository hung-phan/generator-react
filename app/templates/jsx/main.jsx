/** @jsx React.DOM */<% if (moduleLoader === 'browserify') { %>
'use strict';<% if (includeModernizr) { %>
require('browsernizr');<% } %>
var $ = require('jquery');
window.jQuery = $;<% if (includeLodash) { %>
var lodash = require('lodash');
window._ = lodash;<% } %>
var bootstrap = require('./../bower_components/sass-bootstrap/dist/js/bootstrap.js');
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
require([
    'jquery',<% if (includeReactAddons) { %>
    'react-with-addons', <% } else { %>
    'react',<% } %>
    'components/app',<% if (includeModernizr) { %>
    'modernizr',<% } %><% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($, React, app) {
    'use strict';

    $(document).ready(function() {
        /* App Module */
        React.renderComponent(<app />, document.getElementById('app'));
    });
}); <% } %>
