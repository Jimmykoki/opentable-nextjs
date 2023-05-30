import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('sign in');
  if (req.method === 'POST') {
    const errors: string[] = [];
    const { email, password } = req.body;

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorsMessage: 'Email is invalid',
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorsMessage: 'password is invalid',
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) errors.push(check.errorsMessage);
    });

    if (errors.length) {
      return res.status(400).json({ errorsMessage: errors });
    }
    console.log(req.body);

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail) {
      return res
        .status(401)
        .json({ errorsMessage: 'Email or password is invaild' });
    }

    const isMatch = await bcrypt.compare(password, userWithEmail.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ errorsMessage: 'Email or password is wrong' });
    }

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ email: userWithEmail.email })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret);

    return res.status(200).json({
      token,
    });
  }

  return res.status(404).json('Not found');
}
