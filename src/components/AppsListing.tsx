import React from "react";
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
  return (
    <ul className="apps-listing">
      {data &&
        data.map((item: IApp, index: number) => {
          return (
            <AppItem
              item={item}
              onClickCategoryHandler={onClickCategory}
              key={item.id}
            />
          );
        })}
    </ul>
  );
};

export default AppsListing;
