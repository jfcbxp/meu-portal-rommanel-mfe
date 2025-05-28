import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page');
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const token = req.headers.get('authorization');
  const apiBaseUrl = process.env.API_BASE_URL || '';

  const backendUrl = new URL(`${apiBaseUrl}/payments`);
  if (page) backendUrl.searchParams.append('page', page);
  if (status) backendUrl.searchParams.append('status', status);
  if (type) backendUrl.searchParams.append('type', type);
  if (startDate) backendUrl.searchParams.append('startDate', startDate);
  if (endDate) backendUrl.searchParams.append('endDate', endDate);

  const response = await fetch(backendUrl.toString(), {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
