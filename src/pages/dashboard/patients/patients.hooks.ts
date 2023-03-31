 import axios from "axios";
import endpoints from "endpoints";
import queryClient from "queryClient";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export interface IPatient {
  createdDate: Date;
  patientId: number;
  zohoId: string;
  patientname: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: any;
  avatarPath?: any;
  isActive: number;
  phoneNumber: string;
  address?: any;
  deleteFlag: number;
  isRegistered: number;
  zugangscode: string;
  operationDate: string;
  grafts: number;
  methode: string;
  bereich: string;
  imagesRecords: any
}

export interface IPatientListResponse {
  status: number;
  message: string;
  data: IPatientList | { count: number };
}

export interface IPatientList {
  limit: number;
  offset: number;
  more: boolean;
  count: number;
  patients: IPatient[];
}

type UpdatePatientParams = Pick<IPatient, "patientId" | "firstName" | "lastName">;

const getPatientById = async (id: IPatient["patientId"]) => axios.get(`${endpoints.getPatientById}/${id}`);
const listPatients = async () => axios.get(endpoints.listPatients);
const updatePatient = async (values: UpdatePatientParams) => axios.put(`${endpoints.updatePatient}/${values.patientId}`, values);

export const sendPatientResetPasswordEmail = async (email: string) => {
  await axios.post(endpoints.sendPatientResetPasswordEmail, {email})
  toast.success(`Reset password email sent successfully`);
};

export const usePatientsList = () =>
  useQuery(endpoints.listPatients, async () => {
    const { data } = await listPatients();
    
    // return (data as IPatientList).patients.map((item) => ({ ...item, fullName: [item.firstName, item.lastName].join(' ') })) as IPatient & { fullName: string }[];

    return (data as IPatientList).patients;
  });

export const usePatientData = (patientId: IPatient["patientId"]) => useQuery([endpoints.getPatientById, patientId], async () => {
  const { data } = await getPatientById(patientId) 
  return data as IPatient;
});


export const useUpdatePatient = () =>
  useMutation({
    mutationFn: updatePatient,
    onSuccess: ({ data: newItem }) => {
      queryClient.setQueryData(endpoints.listPatients, (oldData: IPatient[] = []) =>
        oldData.map((item) => (item.patientId === newItem.patientId ? newItem : item))
      );
      toast.success(`Updated successfully`);
    },
  });
