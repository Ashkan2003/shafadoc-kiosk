import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useEffect } from "react";

// Define handler types for TypeScript safety
type SuccessHandler<TData> = (data: TData) => void | Promise<void>;
type ErrorHandler<TError> = (error: TError) => void | Promise<void>;

// Custom hook that wraps useQuery and adds onSuccess/onError support
export function useQueryWithHandlers<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    onSuccess?: SuccessHandler<TData>;
    onError?: ErrorHandler<TError>;
  },
): UseQueryResult<TData, TError> {
  // Extract custom handlers, then pass the rest to useQuery
  const { onSuccess, onError, ...queryOptions } = options;

  const query = useQuery(queryOptions);

  // Handle success with useEffect to mimic old callback behavior
  useEffect(() => {
    if (query.isSuccess && query.data !== undefined) {
      onSuccess?.(query.data);
    }
  }, [query.isSuccess, query.data, onSuccess]); // Dependencies to run only on changes

  // Handle error similarly
  useEffect(() => {
    if (query.isError && query.error) {
      onError?.(query.error);
    }
  }, [query.isError, query.error, onError]);

  // Return exactly the same as useQuery
  return query;
}
