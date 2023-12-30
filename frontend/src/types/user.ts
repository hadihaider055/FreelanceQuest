export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  profileImage: string;
  hourlyRate: number;
  languages: string[];
  category: string;
  address: {
    country: string;
    city: string;
    state: string;
    zip: number;
  };
};
