<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index";
	import { page } from "$app/state";
	const menu = [
		{ name: "Home", url: "/" },
		{ name: "Lessons", url: "/lessons" },
	];
	const props = $props();
</script>

<Sidebar.Root {...props}>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each menu as { name, url }}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href={url} {...props}>
									{#if url == page.url.pathname}
										<span class="text-center block w-full underline"
											>{name}</span
										>
									{:else}
										<span class="text-center block w-full">{name}</span>
									{/if}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
