export type User = {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  yoga_id?: number;
  created_at?: Date;
  updated_at?: Date;
  error?: string;
};

export type Yoga = {
  id: string;
  title: string;
  duration: number;
  intensity: string;
  description: string;
  thumbnailimageurl: string;
  videoembeddedurl: string;
  instructor: string;
  name: string;
  handle: string;
  yoga_id: number;
  page: number;
  channel: string;
};

export type SignUpProps = {
  setUser: (user: User) => void;
};

export type setUser = {
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export type State = {
  [key: string]: any;
};
