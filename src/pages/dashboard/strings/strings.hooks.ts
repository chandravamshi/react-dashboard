import axios from 'axios';
import endpoints from 'endpoints';
import queryClient from 'queryClient';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

export type UnsubmitedChanges = {
  [id: string]: {
    type: 'create' | 'update' | 'delete';
    item: IString;
  };
};
export interface IString {
  id: string;
  de: string;
  en: string;
}

interface CreateStringParams {
  id: string;
  values: { lang: string; text: string }[];
}

const listStrings = async () => axios.get(endpoints.listStrings);
const createString = async (values: CreateStringParams) => axios.post(endpoints.createString, values);
const updateString = async (values: CreateStringParams) => axios.post(endpoints.updateString, values);
const deleteString = async (id: IString['id']) => axios.post(endpoints.deleteString, { id });
const mutlipleActionsStrings = async (values: UnsubmitedChanges) =>
  axios.post(endpoints.mutlipleActionsStrings, { actions: Object.values(values).filter(Boolean) });

export const useStringsList = () =>
  useQuery(endpoints.listStrings, async () => {
    const { data = [] } = await listStrings();
    return data as IString[];
  });

export const useCreateString = () =>
  useMutation({
    mutationFn: createString,
    onSuccess: ({ data: newItem }) => {
      queryClient.setQueryData(endpoints.listStrings, (oldData: IString[] = []) => [newItem, ...oldData]);
      toast.success(`${newItem.id} created successfully`);
    },
  });

export const useUpdateString = () =>
  useMutation({
    mutationFn: updateString,
    onSuccess: ({ data: newItem }) => {
      queryClient.setQueryData(endpoints.listStrings, (oldData: IString[] = []) =>
        oldData.map((item) => (item.id === newItem.id ? newItem : item))
      );
      toast.success(`${newItem.id} updated successfully`);
    },
  });

export const useDeleteString = () =>
  useMutation({
    mutationFn: deleteString,
    onSuccess: (_, id) => {
      queryClient.setQueryData(endpoints.listStrings, (oldData: IString[] = []) =>
        oldData.filter((item) => item.id !== id)
      );
      toast.success(`${id} deleted successfully`);
    },
  });

export const useSubmitStringsChanges = () =>
  useMutation({
    mutationFn: mutlipleActionsStrings,
    onSuccess: (_, id) => {
      queryClient.refetchQueries(endpoints.listStrings);
      // queryClient.setQueryData(endpoints.listStrings, (oldData: IString[] = []) =>
      //   oldData.filter((item) => item.id !== id)
      // );
      // toast.success(`${id} deleted successfully`);
    },
  });
