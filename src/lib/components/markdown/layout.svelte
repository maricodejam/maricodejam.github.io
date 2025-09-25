<script module>
	import Link from "./Link.svelte";
	export { Link as a };
</script>

<script>
	const { children } = $props();
</script>

{@render children()}
