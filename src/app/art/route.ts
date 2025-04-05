import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get('keyword') || 'painting';

  const apiUrl = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_API_KEY}&keyword=${encodeURIComponent(
    keyword
  )}&size=10`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return NextResponse.json(data);
}
