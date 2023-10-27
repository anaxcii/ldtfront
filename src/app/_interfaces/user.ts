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
    image: {
      id:number,
      imageUrl:string
    }
  },
  money: string,
  nfts: [],
  transactions: [],
}
