import React, { useEffect, useState } from "react";
import { AppsListing, Categories, SearchBar, Spinner } from "./components";
import { IApp } from "./data/interfaces/app.interface";
import FetchAppsByName from "./data/services/fetchAppsByName";
import FetchAppsByCategory from "./data/services/fetchAppsByCategory";
import FetchAllCategories from "./data/services/fetchAllCategories";
import { EDataType } from "./data/constants";

function App() {
  // Get Data from the Service
  const categories = FetchAllCategories();
  // Get Text from search input field
  const [inputText, setInputText] = useState<string>("");
  // Get the Category selected
  const [category, setCategory] = useState<string>("");

  // Fetch Apps By Text - Only listen to Name
  const [dataByName, dataByNameIsLoading, dataByNameHasError] =
    FetchAppsByName(inputText);
  // Fetch Apps By Category
  const [dataByCategory, dataByCategoryIsLoading, dataByCategoryHasError] =
    FetchAppsByCategory(category);
  // Global Loading
  const isLoading = dataByNameIsLoading || dataByCategoryIsLoading;
  // Global Error
  const hasError = dataByNameHasError || dataByCategoryHasError;

  // Global State to get all results
  const [results, setResults] = useState<IApp[]>([]);
  const [dataType, setDataType] = useState<EDataType>();

  useEffect(() => {
    switch (dataType) {
      case EDataType.CATEGORIES:
        setResults(dataByCategory);
        break;
      case EDataType.TEXT:
      case EDataType.ALL:
        setResults(dataByName);
        break;
      default:
        setResults(dataByName);
        break;
    }
  }, [dataType, dataByCategory, dataByName]);

  // Set Text input and set the type of search
  const onChangeCallback = (text: string) => {
    setInputText(text);
    setDataType(EDataType.TEXT);
  };
  const onClickCategoryHandler = (item: string) => {
    setCategory(item);
    setDataType(EDataType.CATEGORIES);
  };

  // @TODO - Improve this
  const onClickShowAll = () => {
    setDataType(EDataType.ALL);
    setInputText("");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title-font" onClick={onClickShowAll}>
          App Store
        </h1>
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
                <div className="item-category" onClick={onClickShowAll}>
                  All
                </div>
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
              <span>App Directory</span>
            </h3>
            <div className="result-info">
              {inputText.length > 0 && dataType === EDataType.TEXT && (
                <div className="info-line">
                  <span className="info-label">Search Results for:&nbsp;</span>
                  <span className="text-searched">{inputText}</span>
                </div>
              )}
              {dataType === EDataType.CATEGORIES && (
                <div className="info-line">
                  <span className="info-label">Search Results for:&nbsp;</span>
                  <span className="text-searched">{category}</span>
                </div>
              )}
              <div className="info-line">
                {results.length > 0 && (
                  <span className="info-label">Total Results:&nbsp;</span>
                )}
                <span className="text-searched">
                  {results.length || "No Results Found!"}
                </span>
              </div>
            </div>
            <div className="search-results-area">
              {isLoading && <Spinner />}
              {!isLoading && results.length > 0 && (
                <AppsListing
                  data={results}
                  onClickCategory={onClickCategoryHandler}
                />
              )}
              {!isLoading && results.length < 1 && (
                <div className="no-results">No Results Found!</div>
              )}
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
