import type {Locator} from "@playwright/test";
export type BoundingBox = Awaited<ReturnType<Locator["boundingBox"]>>;