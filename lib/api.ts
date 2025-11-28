import { NextResponse } from 'next/server';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string | object;
  message?: string;
  statusCode: number;
};

export class ApiError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(message: string, statusCode = 500, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export function successResponse<T>(data: T, message?: string, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: statusCode }
  );
}

export function errorResponse(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        data: error.data,
      },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: 'Internal Server Error',
    },
    { status: 500 }
  );
}

export const apiHandler =
  <TArgs extends unknown[], TResult>(handler: (...args: TArgs) => Promise<TResult> | TResult) =>
  async (...args: TArgs) => {
    try {
      return await handler(...args);
    } catch (err) {
      return errorResponse(err);
    }
  };
