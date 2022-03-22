import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppsListing, Categories, SearchBar } from "./components";
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

  // Global State to get all results
  const [results, setResults] = useState<IApp[]>([]);
  const [dataType, setDataType] = useState<EDataType>();

  useEffect(() => {
    switch (dataType) {
      case EDataType.CATEGORIES:
        setResults(dataByCategory);
        break;
      case EDataType.TEXT:
        setResults(dataByName);
        break;
      default:
        break;
    }
  }, [dataType, dataByCategory, dataByName]);

  const onChangeCallback = (text: string) => {
    setInputText(text);
    setDataType(EDataType.TEXT);
  };
  const onClickCategoryHandler = (item: string) => {
    setCategory(item);
    setDataType(EDataType.CATEGORIES);
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
              <>
                {inputText.length ? (
                  <div>
                    Search Results for:&nbsp;
                    <span className="text-searched">
                      {inputText || category}
                    </span>
                  </div>
                ) : (
                  <div>App Directory</div>
                )}
                <div>
                  Total Results:&nbsp;
                  <span className="text-searched">{results.length}</span>
                </div>
              </>
            </h3>
            <div className="search-results-area">
              <AppsListing
                data={results}
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
