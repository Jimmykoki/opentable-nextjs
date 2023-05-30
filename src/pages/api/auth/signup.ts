import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, city, password } = req.body;
    const errors: string[] = [];
    console.log(req.body);

    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 10,
        }),
        errorMessage: 'First name must be between 1 and 10 characters',
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 10,
        }),
        errorMessage: 'Last name must be between 1 and 10 characters',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone number is invalid',
      },
      {
        valid: validator.isLength(city, {
          min: 1,
        }),
        errorMessage: 'City is invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Phone number is invalid',
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
      console.log(check);
    });

    if (errors.length) {
      res.status(400).json({
        errorMessage: errors[0],
      });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      res.status(400).json({
        errorMessage: 'Email is associated with another account',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
        phone,
        city,
      },
    });

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret);

    res.status(200).json({
      hello: token,
    });
  }
}
