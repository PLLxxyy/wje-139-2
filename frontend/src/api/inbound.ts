import { request } from '../utils/request';
import { apiPaths } from '../constants/apiPaths';

export const inboundApi = {
  list: <T>() => request<T[]>(apiPaths.inbound),
  create: <T>(payload: any) => request<T>(apiPaths.inbound, { method: 'POST', body: JSON.stringify(payload) }),
  getExpiringItems: <T>(daysWithin: number = 30) =>
    request<T[]>(`${apiPaths.inbound}/expiring-items?daysWithin=${daysWithin}`)
};
