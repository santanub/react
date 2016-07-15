var Td = React.createClass({
  render: function() {
    return <tr>
      <td>
        <input type="checkbox" onClick={this.props.doSum}/>
      </td>
      {this.props.tdData.map(function(cell) { return <td>{cell}</td> })}
    </tr>
  }
});


var Excel = React.createClass({
  getInitialState: function() {
    return {
      sum: 0
    }
  },
  propTypes: {
    header: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    data: React.PropTypes.arrayOf(
      React.PropTypes.string
    )
  },

  _sum: function(a, b) {
    return a + b;
  },

  _selectAll: function(data) {
    return (ev) => {
      var sum = 0;
      var checkBoxes = document.getElementsByTagName("input");

      if(ev.target.checked) {
        for(var i=0; i< checkBoxes.length; i++) {
          checkBoxes[i].checked = true;
        }

        data.map(i => Number(i[3])).forEach(function(i) { return sum = sum + i })
        this.setState({ sum: sum});
      }
      else {
        for(var i=0; i< checkBoxes.length; i++) {
          checkBoxes[i].checked = false;
        }

        this.setState({ sum: 0});
      }
    }
  },

  _handle: function(price) {
    return (ev) => {
      if(!ev.target.checked) {
        price = price * -1
      }

      this.setState({
        sum: this.state.sum + Number(price)
      })
    }
  },

  render: function() {
    return (
      <table id="table">
        <thead>
          <tr>
        <td><input type="checkbox" onClick={this._selectAll(this.props.data)} /></td>
            {this.props.header.map((title, i) => <td key={i}>{title}</td> )}
          </tr>
        </thead>
        <tbody>
        { this.props.data.map((datum, idx) => {
          return <Td key={idx} tdData={datum} doSum={this._handle(datum[3])} />;
        })
        }
          <tr>
            <td colSpan="4">Total</td>
            <td className="total">{this.state.sum.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    )
  }
});


var tableHeader = ["Book", "Author", "Language", "Price"];
var tableData = [["Ruby", "Matsumoto", "English", "110.8"], ["React", "Zukerberg", "Hibru", "100.5"]];

ReactDOM.render(
  React.createElement(Excel, {
    header: tableHeader,
    data: tableData,
  }),
  document.getElementById("app")
);
