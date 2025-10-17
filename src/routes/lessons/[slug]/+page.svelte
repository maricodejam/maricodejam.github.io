<script lang="ts">
	import { onMount } from "svelte";
	import { makeTree } from "$lib/utils.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";

	const { data } = $props();
	let topElement: HTMLElement | undefined = $state(undefined);
	let popoverOpen = $state(false);
	let navigationHierachy: { id: string; depth: number; name: string }[] =
		$state([]);

	onMount(() => {
		function getHierarchy() {
			type TreeItem = { priority: number; id: string; name: string };
			if (!topElement) return [];
			const treeMaker = makeTree<TreeItem>();
			treeMaker.makeChild({
				priority: 0,
				id: "dummy",
				name: "",
			});
			topElement.querySelectorAll("h2, h3, h4").forEach((el) => {
				const item = {
					priority: Number.parseInt(el.tagName.slice(1)),
					id: el.id,
					name: el.textContent,
				};
				const node = treeMaker.getCurrentNode();
				if (!node) {
					treeMaker.makeChild(item);
					return;
				}
				if (node.val.priority < item.priority) {
					treeMaker.makeChild(item);
					return;
				}

				while ((treeMaker.getParent()?.val.priority ?? 0) >= item.priority) {
					treeMaker.makeParent();
				}

				treeMaker.makeParent();
				treeMaker.makeChild(item);
			});
			const rootNode = treeMaker.getRootNode()?.children;
			if (!rootNode) {
				return [];
			}
			const hierarchy: { id: string; depth: number; name: string }[] = [];
			rootNode.forEach((child) => {
				function recurse(kid: typeof child, depth: number) {
					hierarchy.push({ id: kid.val.id, depth: depth, name: kid.val.name });
					if (kid.children == undefined) return;
					kid.children.forEach((kd) => recurse(kd, depth + 1));
				}
				recurse(child, 0);
			});

			return hierarchy;
		}
		function setAttributeOfAllTag<
			K extends keyof HTMLElementTagNameMap | string,
			T extends string | Array<string>,
		>(selector: K, attributes: T, values: T) {
			if (typeof attributes != typeof values || !topElement) {
				return;
			}
			const elements = topElement.querySelectorAll(selector);

			if (typeof attributes == "string" && typeof values == "string") {
				elements.forEach((el) => el.setAttribute(attributes, values));
				return;
			}

			elements.forEach((el) => {
				for (let i = 0; i < attributes.length; i++) {
					const attribute = attributes[i];
					const value = values[i];
					el.setAttribute(attribute, value);
				}
			});
		}

		setAttributeOfAllTag("a", "target", "_blank");
		navigationHierachy = getHierarchy();
	});
</script>

<div
	class="w-full sticky top-15 md:top-[calc(var(--spacing)*15.09)] -mt-5 mb-5 pl-5 py-2 bg-background"
>
	<Popover.Root bind:open={popoverOpen}>
		<Popover.Trigger
			class="text-muted-foreground hover:text-foreground cursor-pointer font-roboto transition-colors duration-500 "
			>On this page <ChevronRight
				class={[
					"inline size-4 transition-transform duration-300",
					popoverOpen && "rotate-90",
				]}
			/></Popover.Trigger
		>
		<Popover.Content align="start" class="w-screen md:max-w-150">
			{#each navigationHierachy as { id, depth, name }}
				<a
					style={`margin-left: ${depth}rem`}
					onclick={() => (popoverOpen = false)}
					class="block text-muted-foreground transition-colors duration-500 hover:text-foreground"
					href={`#${id}`}>{name}</a
				>
			{/each}
		</Popover.Content>
	</Popover.Root>
</div>
<div bind:this={topElement} class="tipography max-w-2xl mx-auto">
	{@render data.lesson?.()}
</div>
