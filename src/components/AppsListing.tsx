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

  // Number of Pages
  const pages = () => {
    let result: number = data.length / PAGE_SIZE;
    if (Number.isInteger(result)) {
      return result;
    } else {
      return Math.round(result) + 1;
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };
  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };
  const changePage = (e: any) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };

  // Build the Pagination Numbers
  const getPaginationGroup = () => {
    return new Array(pages())
      .fill(PAGE_SIZE, 0, pages())
      .map((_, idx) => idx + 1);
  };

  // Get List of Apps Sliced by PAGE_SIZE
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
            <span>«</span>
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : ""
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages() ? "disabled" : ""}`}
          >
            <span>»</span>
          </button>
        </div>
      )}
    </>
  );
};

export default AppsListing;
