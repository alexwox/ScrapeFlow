function isValidSecret(secret: string) {
    const API_SECRET = process.env.API_SECRET;
    if(!API_SECRET) return false;
    return 
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = authHeader.split(" ")[1]

  if(!isValidSecret(secret){
    Response.json({ error: "Unauthorized" }, { status: 401 });
  })
}
