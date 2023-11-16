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
  transaction: {
    price_buy: number
  }
}
