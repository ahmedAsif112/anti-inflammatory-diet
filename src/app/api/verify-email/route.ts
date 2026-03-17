import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required', isValid: false },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        error: 'Invalid email format',
        isValid: false,
      });
    }

    try {
      const domain = email.split('@')[1];
      const response = await fetch(
        `https://dns.google/resolve?name=${domain}&type=MX`
      );
      const data = await response.json();

      const hasMxRecord = data.Answer && data.Answer.length > 0;

      return NextResponse.json({
        isValid: hasMxRecord,
        details: {
          domain,
          hasMxRecord,
          method: 'mx_lookup',
        },
      });
    } catch (error) {
      console.error('MX lookup error:', error);
    }

    // Fallback: just validate format
    return NextResponse.json({
      isValid: true,
      details: {
        method: 'format_only',
        message: 'Only format validation performed',
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error', isValid: false },
      { status: 500 }
    );
  }
}
