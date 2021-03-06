import { rest } from "msw";

export const sessionMock = {
  expires: "1",
  user: {
    id: 1,
    email: "alpha@me.com",
    name: "Alpha",
    image: null,
    createdAt: "2021-06-30T14:39:05.904Z",
  },
};

export const handlers = [
  rest.get("/api/auth/session", (req, res, ctx) => {
    return res(ctx.json(sessionMock));
  }),
];
