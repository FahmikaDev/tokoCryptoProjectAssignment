import React, { Component } from "react";
import axios from "axios";
import { FormModal } from "./Modal";
import "bootstrap/dist/css/bootstrap.css";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "./DataTable"
import ReactTable from "react-table";

class Tickers extends Component {
  toastId = null;

  // notify = () => toast("Wow so easy !");
  update = () => toast.update(this.toastId, { 
    render: "New content",
    type: toast.TYPE.INFO,
    autoClose: 5000 
  });
// );

  fetchCryptocurrencyData() {
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
      .then(response => {
        var wanted = ["bitcoin", "ethereum", "litecoin","ripple"];
        var result = response.data.filter(currency =>
          wanted.includes(currency.id)
        );
        this.setState({ data: result });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchCryptocurrencyData();
    this.interval = setInterval(() => this.fetchCryptocurrencyData(), 1 * 300000);
  }

  state = {
    data: [
      {
        rank: "0",
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price_usd: "1",
        market_cap_usd: "0",
        available_supply: "0",
        percent_change_24h: "0"
      },
      {
        rank: "0",
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price_usd: "1",
        market_cap_usd: "0",
        available_supply: "0",
        percent_change_24h: "0"
      },
      {
        rank: "0",
        id: "litecoin",
        name: "Litecoin",
        symbol: "LTC",
        price_usd: "1",
        market_cap_usd: "0",
        available_supply: "0",
        percent_change_24h: "0"
      },
      {
        rank: "0",
        id: "ripple",
        name: "Ripple",
        symbol: "XRP",
        price_usd: "1",
        market_cap_usd: "0",
        available_supply: "0",
        percent_change_24h: "0"
      }
    ]
  };

  openBuyModal = () => {
    console.log("TESSST");
  };

  render() {

    const columns = [
      {
        Header: "Rank",
        accessor: "rank" // String-based value accessors!
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Symbol",
        accessor: "symbol"
      },
      {
        Header: "Price (USD)",
        accessor: "price_usd",
        Cell: props => <span>$ {props.value}</span>
      },
      {
        Header: "Market Cap (USD)",
        accessor: "market_cap_usd",
        Cell: props => <span>$ {props.value}</span>
      },
      {
        Header: "Available Supply",
        accessor: "available_supply"
      },
      {
        Header: "Change (24h)",
        accessor: "percent_change_24h",
        Cell: props => <span>{props.value} %</span>
      },
    ];

    return (
      <div className="tickers-containers">
        <DataTable data={this.state.data} columns={columns} onEditData={this.handleBuyCoin}/>
        {/* <ReactTable data={this.state.data} columns={columns} /> */}
        <ToastContainer />
      </div>
    );
  }
  handleBuyCoin = e => {
    if (e)
    this.update
    console.log(this.update)
  }
}

export default Tickers;
