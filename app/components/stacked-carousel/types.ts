export interface CarouselCard {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  pricePeriod: string;
  progress: number; // 0 to 100
  verified: boolean;
  gradient: string;
  description?: string;
  tags?: string[];
}
