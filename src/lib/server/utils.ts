const lessons = import.meta.glob("../../routes/lessons/[slug]/*.md");
import type { SvelteComponent } from 'svelte';
export type Posts = Awaited<ReturnType<typeof getAllPost>>

interface MdsvexFile {
	default: SvelteComponent;
	metadata: Record<string, string>;
}

export function getAllPost() {
	const iterableLessons = Object.entries(lessons)
	return Promise.all(
		iterableLessons.map(async ([path, resolver]) => {
			const resolvedLesson = await resolver() as MdsvexFile
			return {
				frontmatter: resolvedLesson.metadata,
				url: path.substring(path.lastIndexOf("lesson-") + "lesson-".length, path.length - 3)
			};
		})
	)
}
