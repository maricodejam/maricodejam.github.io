import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { SvelteComponent } from 'svelte';

interface MdsvexFile {
	default: SvelteComponent;
	metadata: Record<string, string>;
}

export const load: PageLoad = async ({ params }) => {
	const lesson = await import(`./lesson-${params.slug}.md`);
	if (!lesson) {
		error(404)
	}
	console.log(lesson)

	return {
		lesson: lesson.default,
		frontmatter: lesson.metadata
	}
};
