export enum InboundStatus { Pending = 'Pending', Received = 'Received', QCInProgress = 'QCInProgress', Shelved = 'Shelved', Completed = 'Completed' }
export enum OutboundStatus { Pending = 'Pending', Picking = 'Picking', Checking = 'Checking', Packing = 'Packing', Shipped = 'Shipped', Completed = 'Completed' }
export enum StorageRequirement { Normal = 'Normal', ColdChain = 'ColdChain', Dangerous = 'Dangerous', Fragile = 'Fragile' }
export enum QCResult { Pass = 'Pass', Fail = 'Fail', Partial = 'Partial' }
export enum OwnerStatus { Active = 'Active', Suspended = 'Suspended' }
export enum BinStatus { Available = 'Available', Occupied = 'Occupied', Reserved = 'Reserved', Maintenance = 'Maintenance' }
