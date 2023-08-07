/* eslint-disable prettier/prettier */
type QueryParamsType = Record<string, string | number>;

export class QueryParams {
  readonly query: QueryParamsType;

  constructor(params: QueryParamsType) {
    this.query = params;
  }

  toString(){
    const queryString = Object.keys(this.query).reduce((prevVal, queryKey) => {
        return `${prevVal}&${queryKey}=${this.query[queryKey]}`;
    }, '')

    return queryString.slice(1);
  }
}
