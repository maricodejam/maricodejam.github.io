<script lang="ts">
	import { onMount } from "svelte";
	const { data } = $props();

	onMount(() => {
		function setAttributeOfAllTag<
			K extends keyof HTMLElementTagNameMap,
			T extends string | Array<string>,
		>(selector: K, attributes: T, values: T) {
			if (typeof attributes != typeof values) {
				return;
			}
			const elements = document.querySelectorAll(selector);

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
		// I hate having to do this but I got no choice
		document
			.querySelectorAll("a")
			.forEach((link) => link.setAttribute("target", "_blank"));
	});
</script>

<div class="tipography max-w-2xl mx-auto">
	{@render data.lesson?.()}
</div>
