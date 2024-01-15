import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    const api_key_env = process.env.SUPABASE_WEBHOOK_KEY;
    const api_key_headers = request.headers.get('API-Key');

    if (!api_key_headers)
        return NextResponse.json({error: '"API-Key" header is missing'}, {status: 401});
    if (api_key_headers != api_key_env)
        return NextResponse.json({error: 'API-Key is not valid'}, {status: 403});

    return NextResponse.json({
        revalidated: true,
        date: new Date()
    });
}
