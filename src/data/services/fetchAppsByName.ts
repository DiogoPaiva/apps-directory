import React, { useEffect, useState } from "react";
import { IError } from "../interfaces/fetch.interface";
import { BASE_API_PATH } from "../constants";
import { IApp } from "../interfaces/app.interface";

const FetchAppsByName = (queryString?: string): [IApp[], boolean, IError] => {
  const [data, setData] = useState<IApp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<IError>({
    error: false,
    message: "",
  });

  // Base URL
  let url = `${BASE_API_PATH}`;
  if (queryString) {
    url += `?name_like=${queryString}`;
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          // Parse to use dot notation
          const arrayData = JSON.parse(JSON.stringify(result));
          setData(result);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setHasError({
            error: true,
            message: `An Error has occured, please try again later ${error}`,
          });
        }
      );
  }, [url]);

  return [data, isLoading, hasError];
};

export default FetchAppsByName;
