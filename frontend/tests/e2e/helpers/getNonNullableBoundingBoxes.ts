import type {Locator} from "@playwright/test";
import type {BoundingBox} from "@tests/e2e/types/BoundingBox.ts";

export const getNonNullableBoundingBoxes =
    async <T extends readonly Locator[]>(...els: T):
        // Mapped type defines a tuple that has the exact same number of
        // elements as the tuple passed as an argument.
        Promise<{ [K in keyof T]: NonNullable<BoundingBox> }> => {
        const boundingBoxes = Promise.all(els.map(el => el.boundingBox().then(boundingBox => {
            if (!boundingBox) throw new Error("Failed to get the bounding box");
            return boundingBox;
        })))
        // Assert that the resulting Promise resolves to a tuple of the same length
        // as the tuple passed as an argument.
        return boundingBoxes as Promise<{ [K in keyof T]: NonNullable<BoundingBox> }>;
    };