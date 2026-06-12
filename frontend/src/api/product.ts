import { request } from '../utils/request';
import { apiPaths } from '../constants/apiPaths';
export const productApi = { list: <T>() => request<T[]>(apiPaths.products) };
