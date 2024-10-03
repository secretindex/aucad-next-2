export default async function POST(req: Request) {
  try {
    const { title, message } = await req.json()
  } catch (e) {
    return Response.json({ message: e, status: "fail" })
  }
}
