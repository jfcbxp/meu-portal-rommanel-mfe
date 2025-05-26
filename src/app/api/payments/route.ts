import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page');
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const dateStart = searchParams.get('dateStart');
  const dateEnd = searchParams.get('dateEnd');
  const token = req.headers.get('authorization');

  const backendUrl = new URL('http://25.36.229.72:3000/payments');
  if (page) backendUrl.searchParams.append('page', page);
  if (status) backendUrl.searchParams.append('status', status);
  if (type) backendUrl.searchParams.append('type', type);
  if (dateStart) backendUrl.searchParams.append('dateStart', dateStart);
  if (dateEnd) backendUrl.searchParams.append('dateEnd', dateEnd);

  console.log(token);

  const response = await fetch(backendUrl.toString(), {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  console.log('Request:', backendUrl.toString());

  console.log('Response status:', response.status);

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
