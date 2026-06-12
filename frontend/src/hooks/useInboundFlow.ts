import { InboundStatus } from '../types';
export function useInboundFlow() {
  const next = (status: InboundStatus) => status === InboundStatus.Pending ? InboundStatus.Received : status === InboundStatus.Received ? InboundStatus.QCInProgress : status === InboundStatus.QCInProgress ? InboundStatus.Shelved : InboundStatus.Completed;
  return { next };
}
