import React, { Component } from "react";
import Tickers from "./Components/Tickers";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-table/react-table.css";
import { ToastContainer } from "react-toastify"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Toko Coin</h1>
        </header>
        <div className="card text-center">
          <div className="card-header">Profil</div>
          <div className="card-body">
            <h3 className="card-title">Nama Akun</h3>
            <h5 className="card-text">Saldo anda sebesar</h5>
            <p className="card-text">Rp.10.000.000</p>
          </div>
          <div className="card-footer text-muted" />
        </div>
        <Tickers />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
