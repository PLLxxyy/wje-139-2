import { request } from '../utils/request';
import { apiPaths } from '../constants/apiPaths';
export const ownerApi = { list: <T>() => request<T[]>(apiPaths.owners) };
