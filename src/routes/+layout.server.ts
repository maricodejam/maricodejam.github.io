import type { LayoutServerLoad } from "./$types";
import { getAllPost } from "$lib/server/utils";

export const load: LayoutServerLoad = async () => {
	const posts = await getAllPost()
	return {
		posts
	}
}


