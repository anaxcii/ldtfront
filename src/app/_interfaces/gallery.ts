export interface Gallery
{
  id: number,
  name: string,
  image: {
    id:number,
    imageUrl:string
  },
  description: string,
  category: string,
  creator: {
    username :string,
  }
  dropdate: string,
  bannerImage: {
    id:number
    imageUrl:string
  }
}
