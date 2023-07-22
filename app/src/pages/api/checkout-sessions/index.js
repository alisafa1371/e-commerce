import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      // here we can pass product list to the checkout api end point and get the response. the below is postman sample POST req
      const response = axios.post(
        "https://47d15fc3-f352-416b-8f03-9c05ba8f8702.mock.pstmn.io/checkout",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response;
      res.status(201).json({ message: data.data });
    } catch (error) {
      res.status(500).end();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("method not allowed");
  }
}
