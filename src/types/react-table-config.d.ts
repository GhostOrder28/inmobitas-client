import {
  UseExpandedOptions,
  UsePaginationOptions,
} from "react-table";

declare module "react-table" {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UsePaginationOptions<D>,
			UseGroupByOptions<D>,
			UsePaginationOptions<D>,
			UseRowSelectOptions<D>,
			UseSortByOptions<D>,
			UseFiltersOptions<D>,
			UseResizeColumnsOptions<D>,
			Record<string, any> {}

	export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
			extends UseColumnOrderInstanceProps<D>,
				UseExpandedInstanceProps<D>,
				UseFiltersInstanceProps<D>,
				UseGlobalFiltersInstanceProps<D>,
				UseGroupByInstanceProps<D>,
				UsePaginationInstanceProps<D>,
				UseRowSelectInstanceProps<D>,
				UseRowStateInstanceProps<D>,
				UseSortByInstanceProps<D> {}

	export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
			extends UseColumnOrderState<D>,
				UseExpandedState<D>,
				UseFiltersState<D>,
				UseGlobalFiltersState<D>,
				UseGroupByState<D>,
				UsePaginationState<D>,
				UseResizeColumnsState<D>,
				UseRowSelectState<D>,
				UseRowStateState<D>,
				UseSortByState<D> {}
}
