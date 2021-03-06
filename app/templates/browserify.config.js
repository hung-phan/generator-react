//third party libraries alias configurations for browserify
module.exports = [<% if (includeLodash) { %>
    './app/bower_components/lodash/lodash.js:lodash',<% } %><% if (includeFluxxor) { %>
    './app/bower_components/fluxxor/build/fluxxor.js:fluxxor',<% } %>
    './app/bower_components/director/build/director.js:director',<% if (cssFramework === 'SASSBootstrap') { %>
    './app/bower_components/sass-bootstrap/dist/js/bootstrap.js:bootstrap',<% } %>
    './app/bower_components/jquery/dist/jquery.js:jquery'
];

