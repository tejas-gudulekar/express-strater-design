export enum IAssessBY {
    'UNIVERSITY'= 'UNIVERSITY',
    'COLLEGE' = 'COLLEGE'
}

export type IUser = {
  id: number;
  name: string;
  father_name: string;
  mother_name: string;
  email: string;
  mobile: string;
  dob: string; // Use `Date` if you plan to handle this as a date object
  sid: string;
  status: "Approved" | "Pending" | "Rejected"; // Assuming status can be one of these values
  avatar: string;
  signature: string;
  nationality: string;
  gender: "male" | "female" | "other"; // Adjust based on possible values
  aadhaar: string;
  permanent_address: string;
  permanent_city: string;
  permanent_tahsil: string;
  permanent_district: string;
  permanent_state: string;
  permanent_pin: string;
  roll_no: string;
  abc_id: string | null;
};

