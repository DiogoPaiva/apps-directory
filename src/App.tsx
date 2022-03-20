import React, { useEffect, useState } from "react";
import { AppsListing, Categories, SearchBar } from "./components";
import useFetchApps from "./data/services/apps.search.service";
import useFetchCategories from "./data/services/useGetCategories";

function App() {
  // Get Data from the Service
  const [data, isLoading, hasError] = useFetchApps();
  const categories = useFetchCategories();

  const [inputText, setInputText] = useState<string>("");

  const onChangeCallback = (text: string) => {
    setInputText(text);
  };

  const onClickCategoryHandler = (item: String) => {
    console.log("Category clicked:  ", item);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title-font">App Store</h1>
        <div className="input-search-area">
          <SearchBar
            onChange={(e) => {
              onChangeCallback(e);
            }}
            placeholder="Search for Apps"
          />
        </div>
      </header>
      <div className="content-body">
        <div className="inner-content">
          <div className="left-panel">
            <div className="categories-wrapper">
              <div className="menu-left">
                <h3>Browse</h3>
                <div className="item-category">All</div>
              </div>
              <div className="menu-left">
                <h3>Choose Category</h3>
                <Categories
                  data={categories}
                  onClickCallBack={onClickCategoryHandler}
                />
              </div>
            </div>
          </div>
          <div className="right-panel">
            <h3 className="search-label">
              {inputText.length ? (
                <span>
                  Search Results for:&nbsp;
                  <span className="text-searched">{inputText}</span>
                </span>
              ) : (
                <span>App Directory</span>
              )}
            </h3>
            <div className="search-results-area">
              <AppsListing
                data={data}
                onClickCategory={onClickCategoryHandler}
              />
            </div>
            <div style={{ height: "50px" }}>&nbsp;</div>
          </div>
        </div>
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
