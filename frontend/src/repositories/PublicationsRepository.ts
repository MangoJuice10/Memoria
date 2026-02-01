import type {Publication} from "@/types/Publication";
import {publicationsMock} from "@/repositories/__mocks__/Publications.mock"

export function fetchPublications(page = 1, pageSize = 10): Promise<Publication[]> {
    let start = (page - 1) * pageSize;
    let end = start + pageSize;
    return Promise.resolve(publicationsMock.slice(start, end));
}