/** @jsx React.DOM */
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
});
