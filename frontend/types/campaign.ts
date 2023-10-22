export interface Campaign {
  id: string;
  orgId: string;
  name: string;
  description: string;
  deadline: string;
  target: number;
  isActive: boolean;
  createdAt: string;
  organizer: {
    name: string;
  };
}

export default Campaign;
