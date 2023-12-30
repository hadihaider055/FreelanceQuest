export enum JobTypeStatusEnum {
  HOURLY = "HOURLY",
  FIXED_PRICE = "FIXED_PRICE",
}

export type JobType = {
  id: string;
  title: string;
  description: string;
  posted_by: number;
  featured: boolean;
  price: string;
  category: string;
  proposalcount: string;
  createdAt: string;
  updatedAt: string;
  skills: string[];
  type: JobTypeStatusEnum;
  address: {
    country: string;
    city: string;
    state: string;
    zip: number;
  };
};
