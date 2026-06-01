import {useQuery} from "@tanstack/vue-query";
import {findAll} from "../endpoints/educational-resources";
import {educationalResourcesQueryKeys} from "../query-keys/educational-resources-query-keys";

export function createFindAllEducationalResourcesQuery() {
    return useQuery({
        queryKey: educationalResourcesQueryKeys.all,
        queryFn: () => findAll()
    });
}