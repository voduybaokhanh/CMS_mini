export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const handleError = (error: Error) => {
    if (error instanceof AppError) {
        return {
            message: error.message,
            statusCode: error.statusCode,
            status: error.status,
        };
    }

    // Log unexpected errors
    console.error('Unexpected error:', error);

    return {
        message: 'Internal server error',
        statusCode: 500,
        status: 'error',
    };
}; 