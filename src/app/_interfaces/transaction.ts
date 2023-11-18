export interface Transaction {
  id: number,
  price_buy: number,
  creation_date: string,
  nft_id: {
    id: number,
    name: string
  },
  user_seller_id: {
    id: number,
    username: string
  },
  user_buyer_id: {
    id: number,
    username: string
  },
  endDate: string,
  status: string
}

