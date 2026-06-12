import { request } from '../utils/request';
import { apiPaths } from '../constants/apiPaths';
export const outboundApi = { list: <T>() => request<T[]>(apiPaths.outbound) };
