import useSWR, { Fetcher } from 'swr';
import { ApprovalRequest } from '@types';

const fetcher: Fetcher<ApprovalRequest[]> = (url: string) =>
  fetch(url).then((res) => res.json());

export const useApprovalRequests = () => {
  const { data, error, isLoading } = useSWR('api/getApprovalRequests', fetcher);

  return { data, error, isLoading };
};
