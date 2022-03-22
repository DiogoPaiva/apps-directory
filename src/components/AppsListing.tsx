import React, { useState } from "react";
import { PAGE_SIZE } from "../data/constants";
import { IApp } from "../data/interfaces/app.interface";
import AppItem from "./AppItem";

interface IAppsListing {
  data: IApp[];
  onClickCategory?(category: String): void;
}

const AppsListing: React.FunctionComponent<IAppsListing> = (
  props: IAppsListing
) => {
  const { data, onClickCategory } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pages = Math.round(data.length / PAGE_SIZE);

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };
  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const changePage = (e: any) => {
    const pageNumber = Number(e.target.textContent);
    // console.log("pageNumber :", pageNumber);
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    let start = Math.floor(currentPage - 1);
    /*
    console.log("START :", start);
    console.log("PAGES :", pages);
    console.log("data.length : ", data.length);
    console.log("currentPage : ", currentPage);
    */
    return new Array(PAGE_SIZE)
      .fill(pages, 1, pages)
      .map((_, idx) => start + idx + 1);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * PAGE_SIZE - PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.slice(startIndex, endIndex);
  };
  return (
    <>
      <ul className="apps-listing">
        {getPaginatedData() &&
          getPaginatedData().map((item: IApp) => {
            return (
              <AppItem
                item={item}
                onClickCategoryHandler={onClickCategory}
                key={item.id}
              />
            );
          })}
      </ul>
      {data.length > 3 && (
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            prev
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : null
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? "disabled" : ""}`}
          >
            next
          </button>
        </div>
      )}
    </>
  );
};

export default AppsListing;
