 import axios from "axios";
import endpoints from "endpoints";
import queryClient from "queryClient";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export interface IUser {
  createdDate: Date;
  userId: number;
  zohoId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: any;
  avatarPath?: any;
  isActive: number;
  phoneNumber?: any;
  address?: any;
  deleteFlag: number;
  lastSignin?: any;
  branch: string;
  workRole: string;
  userRole: number;
  zugangscode: string;
}

type CreateUserParams = Pick<IUser, "email" | "firstName" | "lastName" | "zugangscode"> & { password: string};
type UpdateUserParams = Pick<IUser, "userId" | "firstName" | "lastName" | "zugangscode">;

const listUsers = async () => axios.get(endpoints.listUsers);
const createUser = async (values: CreateUserParams) => axios.post(endpoints.createUser, values);
const updateUser = async (values: UpdateUserParams) => axios.put(`${endpoints.updateUser}/${values.userId}`, values);

export const sendUserResetPasswordEmail = async (email: string) => {
  await axios.post(endpoints.sendUserResetPasswordEmail, {email})
  toast.success(`Reset password email sent successfully`);
};

export const useUsersList = () => useQuery(endpoints.listUsers, async () => {
  const { data = [] } = await listUsers() 
  return data as IUser[];
});

export const useCreateUser = () =>
  useMutation({
    mutationFn: createUser,
    onSuccess: ({ data: newItem }) => {
      queryClient.setQueryData(endpoints.listUsers, (oldData: IUser[] = []) => [newItem, ...oldData]);
      toast.success(`Created successfully`);
    },
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
    onSuccess: ({ data: newItem }) => {
      queryClient.setQueryData(endpoints.listUsers, (oldData: IUser[] = []) =>
        oldData.map((item) => (item.userId === newItem.userId ? newItem : item))
      );
      toast.success(`Updated successfully`);
    },
  });
