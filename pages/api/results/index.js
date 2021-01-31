import initDb from '../../../src/lib/firebase';

export default async (req, res) => {
  const firebase = await initDb();
  const db = firebase.firestore();

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    db
      .collection('results')
      .doc(data.name)
      .set({ name: data.name, value: data.result })
      .then(() => {
        console.log(`[results] Result successfully created! Name: ${data.name} - ${data.result}`);
        res.status(201).end();
      })
      .catch((error) => {
        res.status(405).end();
      });
  } else if (req.method === 'GET') {
    try {
      const entries = await db
        .collection('results')
        .limit(10)
        .orderBy('value', 'desc')
        .get();

      const results = entries.docs.map((entry) => ({ ...entry.data() }));

      res.status(200).json({ results });
    } catch (e) {
      res.status(400).end();
    }
  } else {
    throw new Error(`Method ${req.method} not allowed!`);
  }
};
