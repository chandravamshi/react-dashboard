import { useMemo } from 'react';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const useFullSearch = (searchValue, data) => useMemo(() => {
  if (!searchValue) return data;
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    return data.filter((row) => Object.keys(row).some((field) => searchRegex.test(row[field].toString())));
},[searchValue, data]);

export const useSearchByKeys = (searchValue, data, keys) => useMemo(() => {
  if (!searchValue) return data;
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    return data.filter((row) => keys.some((key) => searchRegex.test(row[key].toString())));
},[searchValue, data]);
