import { request } from '../utils/request';
import { apiPaths } from '../constants/apiPaths';
export const inboundApi = { list: <T>() => request<T[]>(apiPaths.inbound) };
