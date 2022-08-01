// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Books = {
  name: string,
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
          name: "React",
          bookImg: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7200/9781720043997.jpg",
          bookPrice: 200
        }
      ]
    }
  )
}
