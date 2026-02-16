export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clinica = searchParams.get("clinica");

  if (!clinica) {
    return new Response(
      JSON.stringify({ error: "Clinica não informada" }),
      { status: 400 }
    );
  }

  const url = `https://${clinica}.igutclinicas.com.br/aplicativos/info`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*"
      }
    });

    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Erro no proxy", details: error.message }),
      { status: 500 }
    );
  }
}
