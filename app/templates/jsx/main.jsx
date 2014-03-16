/** @jsx React.DOM */
define('main', [], function() {
    requirejs.config({
        paths: {<% if (includeModernizr) { %>
            'modernizr': '../bower_components/modernizr/modernizr',<% } if (includeReactAddons) { %>
            'react-with-addons': '../bower_components/react/react-with-addons',<% } %>
            'react': '../bower_components/react/react',
            'jquery': '../bower_components/jquery/dist/jquery',<% if (includeUnderscore) { %>
            'underscore': '../bower_components/underscore/underscore',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
            'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %>
        },
        shim: {<% if (includeReactAddons) %>
            'react-with-addons': ['react'],<% } %>
            'bootstrap': ['jquery']
        }
    });

    requirejs([
        'react',<% if (includeReactAddons) { %>
        'react-with-addons',<% } %>
        'jquery',<% if (includeModernizr) { %>
        'modernizr',<% } %><% if (includeUnderscore) { %> 
        'underscore',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
        'bootstrap'<% } %>
    ], function($) {
        'use strict';

        $(document).ready(function() {
            /* App Module */
        
        });
    });
});
