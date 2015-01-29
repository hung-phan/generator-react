requirejs.config({
    baseUrl: './scripts',
    paths: {<% if (includeReactAddons) { %>
        'react-with-addons': '../bower_components/react/react-with-addons',<% } else { %>
        'react': '../bower_components/react/react', <% } %>
        'director': '../bower_components/director/build/director',<% if (includeFluxxor) { %>
        'Fluxxor': '../bower_components/fluxxor/build/fluxxor',<% } %>
        'jquery': '../bower_components/jquery/dist/jquery',<% if (includeLodash) { %>
        'lodash': '../bower_components/lodash/lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
        'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %>
    },
    shim: {<% if (includeReactAddons) { %>
        'react-with-addons': { exports: 'React' },<% } else { %>
        'react': { exports: 'React' },<% } %><% if (includeLodash) { %>
        'lodash': { exports: '_' },<% } %><% if (includeFluxxor) { %>
        'Fluxxor': [<% if (includeReactAddons) { %>'react-with-addons'<% } else { %>'react'<% } %>],<% } %>
        'director': { exports: 'Router' },
        'bootstrap': ['jquery']
    }
});
