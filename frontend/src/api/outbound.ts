import { request } from '../utils/request';
import { apiPaths } from '../constants/apiPaths';

export const outboundApi = {
  list: <T>() => request<T[]>(apiPaths.outbound),
  create: <T>(payload: any) => request<T>(apiPaths.outbound, { method: 'POST', body: JSON.stringify(payload) }),
  getExpiringWarnings: <T>(productIds?: number[], daysWithin: number = 30) => {
    const query = new URLSearchParams({ daysWithin: String(daysWithin) });
    if (productIds && productIds.length > 0) {
      query.set('productIds', productIds.join(','));
    }
    return request<T[]>(`${apiPaths.outbound}/expiring-warnings?${query.toString()}`);
  }
};
