import { EnvField } from '@/enum';
import { UserRole } from '@/enum/common.enum';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env[EnvField.JWT_SECRET] || 'secret';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const decoded = jwt.decode(token) as JwtPayload | null;

    if (!decoded || typeof decoded === 'string' || !decoded.email) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const { email, name, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || 'User',
        email,
        image: picture,
        role: UserRole.READER,
      });
    } else {
      if (picture && user.image !== picture) {
        user.image = picture;
        await user.save();
      }
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    const now = Date.now();
    const accessTokenExpiresIn = now + 3600 * 1000;
    const refreshTokenExpiresIn = now + 7 * 24 * 3600 * 1000;

    const responseData = {
      data: {
        ...user.toJSON(),
        token: {
          accessToken,
          refreshToken,
          accessTokenExpiresIn,
          refreshTokenExpiresIn,
        },
      },
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Social login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
