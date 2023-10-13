export interface Gallery
{
  id: number,
  name: string,
  image: string,
  description: string,
  category: string,
  creator: {
    username :string,
  }
  dropdate: string,
  banner_image: string,
}
