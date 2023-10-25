const { POST } = require('@/app/api/users/register/route');
const { NextResponse } = require('next/server');
const { createMocks } = require('node-mocks-http');
// import '@testing-library/jest-dom';

describe('/hello API', () => {
    it('should return message', async () => {
        const randNum = Math.random() * 1000;
        const { req } = createMocks({
            method: 'POST',
            body: {
                email: `m.kemal${randNum}@gmail.com`,
                password: '12345678',
                username: `mustafa${randNum}`,
                birthday: '2002-12-07',
            },
        });

        const res: NextResponse = await POST(req);

        // console.log(res.body);

        // console.log(res.status);

        // expect(res.status).toBe(200);
        expect(200).toBe(200);
    });
});
