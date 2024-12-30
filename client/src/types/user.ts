export interface User {
    _id: string;
    name: string;
    username: string;
    profileImage: string;
    email: string;
    phone: string;
    isActivated: boolean;
    suspended: {
      status: boolean;
      reason: string;
      suspendedAt: Date;
      suspendedTill: Date;
    };
    createdAt: Date;
  }