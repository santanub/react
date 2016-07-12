var Counter = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired
  },

  render: function() {
    return React.DOM.span(null, this.props.count)
  }
});

var TextAreaCounter = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
  },
  getInitialState: function() {
    return { text: this.props.defaultValue.toUpperCase() }
  },
  textChange: function(ev) {
    this.setState({
      text: this.refs.text.value.toUpperCase(),
    });
  },
  _log: function(myMethodName, args) {
    console.log(myMethodName, args);
  },
  componentWillUpdate: function() { this._log('compWillUpdate', arguments);},
  componentDidUpdate: function(oldProps, oldState) {
    this._log('compDidUpdate', arguments);

    if(this.state.text.length > 25) {
      this.setState({ text: oldState.text });
    }
  },
  componentWillMount: function() { this._log('compWillMnt', arguments);},
  componentDidMount: function() { this._log('compDidMnt', arguments);},
  componentWillUnmount: function() { this._log('compWillUnmnt', arguments);},
  render: function() {
    var counter = null;
    if(this.state.text.length > 0) {
      counter = React.DOM.h3(null, React.createElement(Counter, {
        count: this.state.text.length
      }))
    }

    return React.DOM.div(null,
                         React.DOM.textarea(
                           {
                             value: this.state.text,
                             ref: "text",
                             onChange: this.textChange
                           }
                         ),
                         counter
                        )
  }
});

ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: "bugu"
  }),
  document.getElementById("app")
);
