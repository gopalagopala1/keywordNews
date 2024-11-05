export type NewsCardProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  isLoading: boolean;
};


export type FetchNewsPayload = {
  includeKeywords?: string[];
  excludeKeywords?: string[];
  category?: string;
  country?: string;
  page?: number;
};
