/*** @jsx React.DOM */
'use strict';<% if (moduleLoader === 'browserify') { %>
/*React with addons*/
var React = require('react/addons');<% } else { %>
/*React.js*/
var React = require('react');<% } %>
module.exports = React.createClass({
    getInitialState: function() {
        return {
            text: 'Click Me!'
        };
    },
    clickMeUpdate: function(e) {
        this.setState({
            text: this.state.text.split('').reverse().join('')
        });
    },
    render: function() {
        return (
            <h1 onClick={this.clickMeUpdate}>{this.state.text}</h1>
        )
    }
});<% } else { %>
define([<% if (includeReactAddons) { %>
    'react-with-addons', <% } else { %>
    'react',<% } %>
], function(React) {
    var <%= name %> = React.createClass({
        getInitialState: function() {
            return {
                text: 'Click Me!'
            };
        },
        clickMeUpdate: function(e) {
            this.setState({
                text: this.state.text.split('').reverse().join('')
            });
        },
        render: function() {
            return (
                <h1 onClick={this.clickMeUpdate}>{this.state.text}</h1>
            );
        }
    });
    return <%= name %>;
});<% } %>
