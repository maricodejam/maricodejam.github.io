<script lang="ts">
	import { Separator } from "$lib/components/ui/separator/index";
	import { getContext } from "svelte";
	import { type Posts } from "$lib/server/utils";
	const { posts }: { posts: Posts } = getContext("posts");
</script>

{#each posts as post}
	<a
		href={`lessons/${post.url}`}
		class="w-full h-10 border-2 border-border p-2 gap-3 flex"
	>
		<h1 class="uppercase">{post.frontmatter.title}</h1>
		<Separator orientation="vertical" />
		<p>{post.frontmatter.description}</p>
	</a>
{/each}
