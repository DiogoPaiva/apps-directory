export interface IError {
    error: boolean;
    message?: any;
}

export interface IQueryParams {
    pageSize: number;
    pageNumber: number;
    sort: string;
    text: string;
    category: string;

}