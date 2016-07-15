"use strict";

var Td = React.createClass({
  displayName: "Td",

  render: function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        React.createElement("input", { type: "checkbox", onClick: this.props.doSum })
      ),
      this.props.tdData.map(function (cell) {
        return React.createElement(
          "td",
          null,
          cell
        );
      })
    );
  }
});

var Excel = React.createClass({
  displayName: "Excel",

  getInitialState: function getInitialState() {
    return {
      sum: 0
    };
  },
  propTypes: {
    header: React.PropTypes.arrayOf(React.PropTypes.string),
    data: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  _sum: function _sum(a, b) {
    return a + b;
  },

  _selectAll: function _selectAll(data) {
    var _this = this;

    return function (ev) {
      var sum = 0;
      var checkBoxes = document.getElementsByTagName("input");

      if (ev.target.checked) {
        for (var i = 0; i < checkBoxes.length; i++) {
          checkBoxes[i].checked = true;
        }

        data.map(function (i) {
          return Number(i[3]);
        }).forEach(function (i) {
          return sum = sum + i;
        });
        _this.setState({ sum: sum });
      } else {
        for (var i = 0; i < checkBoxes.length; i++) {
          checkBoxes[i].checked = false;
        }

        _this.setState({ sum: 0 });
      }
    };
  },

  _handle: function _handle(price) {
    var _this2 = this;

    return function (ev) {
      if (!ev.target.checked) {
        price = price * -1;
      }

      _this2.setState({
        sum: _this2.state.sum + Number(price)
      });
    };
  },

  render: function render() {
    var _this3 = this;

    var els = function els(data) {
      return data.map(function (cell) {
        return React.createElement(
          "td",
          null,
          cell
        );
      });
    };

    return React.createElement(
      "table",
      { id: "table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            React.createElement("input", { type: "checkbox", onClick: this._selectAll(this.props.data) })
          ),
          this.props.header.map(function (title, i) {
            return React.createElement(
              "td",
              { key: i },
              title
            );
          })
        )
      ),
      React.createElement(
        "tbody",
        null,
        this.props.data.map(function (datum, idx) {
          return React.createElement(Td, { key: idx, tdData: datum, doSum: _this3._handle(datum[3]) });
        }),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { colSpan: "4" },
            "Total"
          ),
          React.createElement(
            "td",
            { className: "total" },
            this.state.sum.toFixed(2)
          )
        )
      )
    );
  }
});

var tableHeader = ["Book", "Author", "Language", "Price"];
var tableData = [["Ruby", "Matsumoto", "English", "110.8"], ["React", "Zukerberg", "Hibru", "100.5"]];

ReactDOM.render(React.createElement(Excel, {
  header: tableHeader,
  data: tableData
}), document.getElementById("app"));
