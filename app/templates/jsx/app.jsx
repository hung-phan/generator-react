/*** @jsx React.DOM */
define(['react'], function(React) {
    return React.createClass({
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
    });
});

