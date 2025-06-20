export type Comment = {
  id: string;
  text: string;
  x: number;
  y: number;
  solved: boolean;
  location?: string;
  createdAt: Date;
};
