/*** @jsx React.DOM */
'use strict';<% if (moduleLoader === 'browserify') { %><% if (includeReactAddons) { %>
/*React with addons*/
var React = require('react/addons');<% } else { %>
/*React.js*/
var React = require('react');<% } %>
module.exports = React.createClass({
    getInitialState: function() {
        return {
            text: 'Template for <%= name %>'
        };
    },
    clickMeUpdate: function(e) {
        this.setState({
            text: this.state.text.split('').reverse().join('')
        });
    },
    render: function() {
        return (@@include('_<%= name %>.tpl.jsx'));
    }
});<% } else { %>
define([<% if (includeReactAddons) { %>
    'react-with-addons', <% } else { %>
    'react',<% } %>
], function(React) {
    var <%= name %> = React.createClass({
        getInitialState: function() {
            return {
                text: 'Template for <%= name %>'
            };
        },
        clickMeUpdate: function(e) {
            this.setState({
                text: this.state.text.split('').reverse().join('')
            });
        },
        render: function() {
            return (@@include('_<%= name %>.tpl.jsx'));
        }
    });
    return <%= name %>;
});<% } %>
