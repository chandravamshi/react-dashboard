import axios from 'axios';
import endpoints from 'endpoints';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { ILead, IOfferTemplate, ITemplates } from './offers.types';

type CreateOfferParams = {
  /* 
  templateId: IOfferTemplate["id"];
  leadId: ILead["id"];
  body: string; // <html></html>
  */
  templateId: number;
  data: string;
};

export enum OfferStatus {
  Accepted = 'Accepted',
  Read = 'Read',
  Unread = 'Unread',
  Expired = 'Expired',
}
export interface IData {
  status: number;
  message: string;
  data: {
    acceptDate: Date;
    body: string;
    createdDate: string;
    expiry: number;
    id: number;
    isAccepted: boolean;
    lastView: string;
    leadId: string;
    preferredDate: string;
    templateId: number;
    type: string;
    uid: string;
    url: string;
    views: number;
    offerStatus: OfferStatus;
  }[];
}

const getLeadById = async (id: ILead['id']) => axios.get(`${endpoints.getLeadById}/${id}`);
const getOffersList = async () => axios.get(endpoints.getOffersList);
const getOfferTemplates = async () => axios.get(endpoints.getOffersListWithTemplateAndData);
const getOfferTemplateById = async (id: IOfferTemplate['id']) =>
  axios.get(endpoints.getTmeplateByIdAndSectionContents, { params: { id } });
const getOfferById = async (uid: string) => axios.get(`${endpoints.getOfferById}/${uid}`);
const createOffer = async (values: CreateOfferParams) =>
  axios.post('http://localhost:5001/offers/generate-offer', values).then(({ data }) => data);

const deleteTemplate = async (values) =>
  axios.post('http://localhost:5001/offers/delete-template', values).then(({ data }) => data);

const listTemplates = async () => axios.get('http://localhost:5001/offers/get-templates');

export const useOfferList = () =>
  useQuery([endpoints.getOffersList], async () => {
    const { data = [] } = await getOffersList();
    return data as IData['data'];
  });

export const useTemplateList = () =>
  useQuery(endpoints.listStrings, async () => {
    const { data = [] } = await listTemplates();
    return data;
  });

export const useLeadData = (leadId: ILead['id']) =>
  useQuery([endpoints.getLeadById, leadId], async () => {
    const { data } = await getLeadById(leadId);
    return data?.data?.[0]?.keyValues as ILead;
  });

export const useOfferTemplates = () =>
  useQuery([endpoints.getOffersListWithTemplateAndData], async () => {
    const { data } = await getOfferTemplates();
    // return data as ITemplates;
    return data;
  });

const replaceSectionWithData = async (templateData, body) => {
  templateData.forEach((element, ei) => {
    Object.keys(element.templateContent).forEach((k, v) => {
      if (k !== 'contentId') {
        body = body.replaceAll(`{{${k}}}`, templateData[ei].templateContent[k]);
      }
    });
  });
  // console.log(body)
  return body;
};

export const useOfferTemplateData = (id?: ITemplates['id']) =>
  useQuery(
    [endpoints.getOfferTemplateById, id],
    async () => {
      const { data } = await getOfferTemplateById(id);
      let nb: string;

      data.forEach((val, i) => {
        // if (i !== 0) {
        nb += val.sectionContent.content;
        // }
      });
      const body = await replaceSectionWithData(data, nb);
      return { body, data };
    },
    { enabled: !!id }
  );

export const useOfferData = (uid: string) =>
  useQuery([endpoints.getOfferById, uid], async () => {
    const { data } = await getOfferById(uid);
    return data;
  });

export const useCreateOffer = () =>
  useMutation({
    mutationFn: createOffer,
    onSuccess: ({ data: newItem }) => {
      // queryClient.setQueryData(endpoints.listOffers, (oldData: IOffer[] = []) => [newItem, ...oldData]);
      // toast.success(`Created successfully`);
    },
  });

export const useDeleteTemplate = () =>
  useMutation({
    mutationFn: deleteTemplate,
    onSuccess: (_, data) => {
      toast.success(`${data.name} deleted successfully`);
    },
  });

