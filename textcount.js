var TextAreaCounter = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
  },
  getInitialState: function() {
    return { text: this.props.defaultValue }
  },
  _textChange: function(ev) {
    this.setState({
      text: ev.target.value,
    });
    document.getElementById("my-text-area").value = ev.target.value.toUpperCase();
  },
  _log: function(myMethodName, args) {
    console.log(myMethodName, args);
  },
  componentWillUpdate: function() { this._log('compWillUpdate', arguments);},
  componentDidUpdate: function(oldProps, oldState) {
    this._log('compDidUpdate', arguments);

    if(this.state.text.length > 25) {
      this.replaceState({ text: oldState });
    }
  },
  componentWillMount: function() { this._log('compWillMnt', arguments);},
  componentDidMount: function() { this._log('compDidMnt', arguments);},
  componentWillUnmount: function() { this._log('compWillUnmnt', arguments);},
  render: function() {
    return React.DOM.div(null,
                         React.DOM.textarea(
                           {
                             defaultValue: this.props.defaultValue.toUpperCase(),
                             onChange: this._textChange,
                             id: "my-text-area"
                           }
                         ),
                         React.DOM.h1(null, this.state.text.length)
                        )
  }
});

ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: "bugu"
  }),
  document.getElementById("app")
);
