export enum CreatorType {
  Streamer = 'Streamer',
  ContentCreator = 'Content Creator',
  IndieGameDev = 'Indie Game Developer',
  Other = 'Other'
}

export interface FormData {
  name: string;
  email: string;
  creatorType: CreatorType;
  message: string;
  acceptTerms: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  creatorType?: string;
  message?: string;
  acceptTerms?: string;
}