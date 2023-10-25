export type ErrorParams = {
    statusCode: number;
    message?: string;
    error?: any;
    errCode?: string;
};

export type ImageType = {
    id: string;
    imageUrl: string;
    userId: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
    createdAt: string;
    description: string;
};
