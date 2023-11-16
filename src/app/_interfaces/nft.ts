export interface Nft
{
  id: number,
  name: string,
  image: {
    id:number,
    imageUrl:string
  },
  nftgallery: {
    name:string,
    description: string,
    creator:{
      username:string
    }
  },
  owner: |any,
  mintdate:string,
  currentOrder: {
    price_buy: number
  }
  transaction: {
    price_buy: number,

  }
  price: number;
}
