export interface Gallery {
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  creator: {
    "@type": string;
    "@id": string;
    id: number;
    username: string;
    userIdentifier: string;
    roles: string[];
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    birth: string;
    address: string;
    galleries: string[];
    money: number;
    nfts: string[];
    transactions: any[];
  };
  nfts: string[];
  dropdate: string;
  banner_image: string;

}
