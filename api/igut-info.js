export default async function handler(req, res) {
  try {
    const { clinica } = req.query;

    if (!clinica) {
      return res.status(400).json({
        error: "Clinica não informada"
      });
    }

    const url = `https://${clinica}.igutclinicas.com.br/aplicativos/info`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*"
      }
    });

    const text = await response.text();

    return res.status(200).json({
      status: response.status,
      ok: response.ok,
      body: text
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro interno",
      details: error.message
    });
  }
}
