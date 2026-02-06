export default async function handler(req, res) {
  try {
    const { clinica } = req.query;

    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não informada' });
    }

    const url = `https://${clinica}.igutclinicas.com.br/aplicativos/info`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro no proxy' });
  }
}
