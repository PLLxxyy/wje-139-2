import { request } from '../utils/request';
import { apiPaths } from '../constants/apiPaths';
export const binLocationApi = { list: <T>() => request<T[]>(apiPaths.bins) };
