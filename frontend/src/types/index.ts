export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status:
    | 'New'
    | 'Contacted'
    | 'Qualified'
    | 'Lost';

  source:
    | 'Website'
    | 'Instagram'
    | 'Referral';

  createdAt: string;

  createdBy: User;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}