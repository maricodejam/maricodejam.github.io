import type { PageServerLoad } from "./$types";

const lessons = import.meta.glob("./[slug]/*.md");
function getAllPost() {
	const iterableLessons = Object.entries(lessons)
	return Promise.all(
		iterableLessons.map(async ([path, resolver]) => {
			const resolvedLesson = await resolver()
			return {
				frontmatter: resolvedLesson.metadata,
				url: path.substring(path.lastIndexOf("lesson-") + "lesson-".length, path.length - 3)
			};
		})
	)
}
export const load: PageServerLoad = async () => {
	const posts = await getAllPost();
	return {
		posts
	}
};
