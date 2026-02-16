export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clinica = searchParams.get("clinica");

    if (!clinica) {
      return new Response(
        JSON.stringify({ error: "Clinica não informada" }),
        { status: 400 }
      );
    }

    const url = `https://${clinica}.igutclinicas.com.br/aplicativos/info`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*"
      }
    });

    const text = await response.text();

    return new Response(
      JSON.stringify({
        status: response.status,
        ok: response.ok,
        body: text
      }),
      { status: 200 }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Erro interno",
        details: error.message,
        stack: error.stack
      }),
      { status: 500 }
    );
  }
}
