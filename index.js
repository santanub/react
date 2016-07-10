var Component = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  render: function() {
    return React.DOM.h1(null, "I am "+ this.props.name)
  }
});

ReactDOM.render(
  React.DOM.h1({
    id: "my_header",
    className: "my-header"
  }, "Hello Bugu"),
  document.getElementById("app")
);

ReactDOM.render(
  React.createElement(Component, {
    name: "Bugu"
  }),
  document.getElementById("app")
);
