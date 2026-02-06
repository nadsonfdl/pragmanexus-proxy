export default async function handler(req, res) {
  try {
    const { clinica } = req.query;

    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não informada' });
    }

    const url = `https://${clinica}.igutclinicas.com.br/aplicativos/info`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json,text/plain,*/*'
      }
    });

    const text = await response.text();

    // Se não for JSON válido, devolve o texto (debug)
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).send(text);
    }

  } catch (err) {
    return res.status(500).json({
      error: 'Erro no proxy',
      details: err.message
    });
  }
}
