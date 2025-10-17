import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const load: PageLoad = async ({ params }) => {
	const lesson = await import(`./lesson-${params.slug}.md`);
	if (!lesson) {
		error(404)
	}

	return {
		lesson: lesson.default,
		frontmatter: lesson.metadata
	}
};
