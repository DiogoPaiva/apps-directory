import React, { useEffect, useState } from "react";
import FetchApps from "./data/services/apps.service";

function App() {
  // Get Data from the Service
  const [data, isLoading, hasError] = FetchApps();

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title-font">Apps Listing</h1>
      </header>
      <div className="content-body">
        <div className="inner-content"></div>
      </div>
      <footer className="fixed-footer">
        <span className="inner-text">
          Made By Diogo Paiva - info@diogopaiva.com
        </span>
      </footer>
    </div>
  );
}

export default App;
