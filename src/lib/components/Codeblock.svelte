<script lang="ts">
	import { cn } from "$lib/utils";
	import hljs from "highlight.js/lib/core";
	import python from "highlight.js/lib/languages/python";
	import { buttonVariants } from "$lib/components/ui/button/index";
	import Clipboard from "@lucide/svelte/icons/clipboard";
	import Check from "@lucide/svelte/icons/check";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

	hljs.registerLanguage("python", python);

	const {
		lang,
		inline = false,
		code,
		caption = "",
		class: className,
	}: {
		lang: string;
		inline: boolean;
		code: string;
		caption: string;
		class: string;
	} = $props();

	let codeElement: undefined | HTMLElement = $state(undefined);
	let checkedClipboard = $state(false);
	$effect(() => {
		if (!codeElement) return;
		hljs.highlightElement(codeElement);
	});
	function onPaste() {
		checkedClipboard = true;
		setTimeout(() => {
			checkedClipboard = false;
		}, 3000);
	}
</script>

{#if inline}
	<code>{code.trim()}</code>
{:else}
	<figure
		class={cn(
			"bg-code border-1 border-border text-code-foreground my-4 px-5 py-2 rounded",
			className,
		)}
	>
		<figcaption class="text-muted-foreground flex justify-between">
			<span>{caption == "" ? lang : caption}</span>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger
						class={buttonVariants({ size: "icon", variant: "ghost" })}
						onclick={onPaste}
					>
						<Clipboard class={checkedClipboard ? "hidden" : ""} />
						<Check class={!checkedClipboard ? "hidden" : ""} />
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Copy to clipboard</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</figcaption>
		<pre><code style="padding: 0" bind:this={codeElement}>{code.trim()}</code
			></pre>
	</figure>
{/if}
