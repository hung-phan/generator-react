requirejs.config({
    baseUrl: './scripts',
    paths: {<% if (includeModernizr) { %>
        'modernizr': '../bower_components/modernizr/modernizr',<% } if (includeReactAddons) { %>
        'react-with-addons': '../bower_components/react/react-with-addons',<% } else { %>
        'react': '../bower_components/react/react', <% } %>
        'director': '../bower_components/director/build/director',
        'jquery': '../bower_components/jquery/dist/jquery',<% if (includeLodash) { %>
        'lodash': '../bower_components/lodash/dist/lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
        'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %>
    },
    shim: {<% if (includeReactAddons) { %>
        'react-with-addons': {
            exports: 'React'
        },<% } else { %>
        'react': {
            exports: 'React'
        },<% } %><% if (includeLodash) { %>
        'lodash': {
            exports: '_'
        },<% } %>
        'director': {
            exports: 'Router'
        },
        'bootstrap': ['jquery']
    }
});
