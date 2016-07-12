var Excel = React.createClass({
  propTypes: {
    header: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    data: React.PropTypes.arrayOf(
      React.PropTypes.string
    )
  },
  render: function() {
    return React.DOM.table(
      { className: "table" },
      React.DOM.thead(null,
                      React.DOM.tr(null,
                                   this.props.header.map(function(title, idx) {
                                     return React.DOM.th({key: idx}, title);
                                   })
                                  )),
      React.DOM.tbody(null,
                      this.props.data.map(function(datum, idx) {
                        return React.DOM.tr({key: idx},
                                            datum.map(function(cell, idx){
                                              return React.DOM.td({key: idx}, cell);
                                            }))
                      }))

    )

  }
});

var tableHeader = ["Book", "Author", "Language"];
var tableData = [["Ruby", "Matsumoto", "English"], ["React", "Zukerberg", "Hibru"]];

ReactDOM.render(
  React.createElement(Excel, {
    header: tableHeader,
    data: tableData
  }),
  document.getElementById("app")
);