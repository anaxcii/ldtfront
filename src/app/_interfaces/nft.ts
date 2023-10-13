export interface Nft
{
  id: number,
  name: string,
  price: number,
  image: string,
  nftgallery: {
    name:string,
    description: string,
    creator:{
      username:string
    }
  },
  owner: |any,
  mintdate:string,
  on_sale: boolean,
  transaction: string,
}
