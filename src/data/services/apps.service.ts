import React, { useEffect, useState } from 'react';
import { IError } from '../interfaces/fetch.interface';
import { BASE_API_PATH } from '../constants';
import { IApp } from '../interfaces/app.interface';

const useFetchApps = (): [IApp[], boolean, IError] => {
    
const [data, setData] = useState<IApp[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [hasError, setHasError] = useState<IError>({
    error: false,
    message: ''
});

// Base URL
const url = `${BASE_API_PATH}?`;

useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
            // Parse to use dot notation
            const arrayData = JSON.parse(JSON.stringify(result));
            // Add a Timout to simulate fetch duration - Only for Exercise purpose :)
            setTimeout(()=> {
                setIsLoading(false);
            }, 1000)
        },
        (error) => {
            setIsLoading(false);
            setHasError({
                error: true, 
                message: `An Error has occured, please try again later ${error}`
            });
        }
      )
  }, [url])
 
return [ data, isLoading, hasError];

}

export default useFetchApps;
