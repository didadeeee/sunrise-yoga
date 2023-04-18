export type User = {
    name: string;
    email: string;
    password: string;
    birthday: Date;
  }
  
  export type Yoga = {
    id: string;
    title: string;
    instructor: string;
    handle: string;
    duration: number;
    intensity: string;
    description: string;
    thumbnailimageurl: string;
    videoembeddedurl: string;
  };