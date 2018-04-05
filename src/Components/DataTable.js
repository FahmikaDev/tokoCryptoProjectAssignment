import React, { Component } from "react";
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
const CheckboxTable = checkboxHOC(ReactTable);

const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id])
        .toLowerCase()
        .startsWith(filter.value.toLowerCase())
    : true;
};

export default class DataTable extends Component {
  render() {
    const {
      data,
      columns,
      defaultPageSize,
      onEditData,
      cardBorderColor,
      withoutCard
    } = this.props;
    const {
      toggleTableFilter,
    } = this;

    let newColumns = [...columns];
    if (onEditData) {
      newColumns.push({
        Header: "Purchase",
        accessor: "_id",
        maxWidth: 70,
        filterable: false,
        Cell: props => (
          <div>
            <button
              className="btn btn-success btn-sm btn-rounded"
              onClick={this.editSelected(props.original)}
            >
            Buy
            </button>
          </div>
        )
      });
    }

    return (
      <section
        className={
          (withoutCard ? "" : "card") +
          " card-" +
          (cardBorderColor ? cardBorderColor : "green")
        }
      >
        <div className="card-block">
            &nbsp;
            <button
              className="btn btn-default btn-sm"
              onClick={toggleTableFilter}
            >
              <i className="fa fa-filter" /> Filter
            </button>
            &nbsp;
          <div className="clearfix" />

          <CheckboxTable
            filterable={this.state.tableFilterVisible}
            defaultFilterMethod={filterCaseInsensitive}
            data={data}
            columns={newColumns}
            defaultPageSize={defaultPageSize ? defaultPageSize : 10}
            // ref={r => (this.checkboxTable = r)}
          />
        </div>
      </section>
    );
  }

  state = {
    tableFilterVisible: false,
  };

  editSelected = row => e => {
    if (e) e.preventDefault();
    if (this.props.onEditData) {
      this.props.onEditData({
        row,
        key: row._id
      });
    }
  };

  toggleTableFilter = e => {
    if (e) e.preventDefault();
    this.setState({ tableFilterVisible: !this.state.tableFilterVisible });
  };

}
