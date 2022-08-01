// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Books = {
  bookName: string,
  bookImg: string,
  bookPrice: number
}

type Data = {
  books: Books[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json({ name: 'John Doe' })
  res.status(200).json(
    {
      books: [
        {
          bookName: "React",
          bookImg: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7200/9781720043997.jpg",
          bookPrice: 200
        },
        {
          bookName: "Vue",
          bookImg: "https://www.b2s.co.th/media/catalog/product/cache/31c1e2dc995f93131e503292bcd47775/5/3/5303110.jpg",
          bookPrice: 150
        },
        {
          bookName: "Angular",
          bookImg: "https://www.b2s.co.th/media/catalog/product/cache/31c1e2dc995f93131e503292bcd47775/5/2/5290075_1.jpg",
          bookPrice: 300
        }
      ]
    }
  )
}
