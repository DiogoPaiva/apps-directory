import React from "react";
import useSearchApps from "./fetchAppsByName";

const FetchAllCategories = (): string[] => {
  // Get Data from the Service
  const [data] = useSearchApps();

  // Extract categories node from each object on the original array
  const categoriesData = data.map((item) => {
    return item.categories;
  });

  let newArr: string[] = [];
  // Iterate form the extrated arrays
  // Concat into a single array of strings.
  // Filter to Remove duplicates
  // Sort by Alphabetic desc
  for (var i = 0; i < categoriesData.length; i++) {
    newArr = newArr
      .concat(categoriesData[i] as string[])
      .filter((parameter, index, array) => array.indexOf(parameter) === index)
      .sort();
  }

  return newArr;
};

export default FetchAllCategories;
