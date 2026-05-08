import {type Test} from "supertest";

export function setAccessToken(req: Test, accessToken: string) {
  return req.set({
    Authorization: `Bearer ${accessToken}`
  });
}