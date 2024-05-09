// pages/api/lokalise-webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function lokaliseWebhook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Extract the payload from the request body
    const payload = req.body;

    // Handle the payload (e.g., update translations in your app)
    // Your logic here...

    // Respond with a success message
    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
