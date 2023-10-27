export interface IUser {
  id: number,
  username: string,
  plainPassword: string,
  email: string,
  firstname: string,
  lastname: string,
  birth: string,
  address: string,
  galleries: {
    id: number;
    name: string;
    image: {
      id: number;
      imageUrl: string;
    };
  }[];
  money: string,
  nfts: [],
  transactions: [],
}
