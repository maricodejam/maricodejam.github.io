<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index";
	import { page } from "$app/state";
	import logo from "$lib/assets/codejam_logo3.svg";
	import { getContext } from "svelte";
	import type { Posts } from "$lib/server/utils";
	const props = $props();
	const { posts }: { posts: Posts } = getContext("posts");

	const lessons = posts.map((post) => ({
		name: post.frontmatter.title,
		url: `/lessons/${post.url}`,
	}));

	const menu = [{ name: "Lessons", url: "/lessons", subMenu: lessons }];
</script>

<Sidebar.Root {...props}>
	<Sidebar.Header class="min-h-15 pl-5 flex justify-center">
		<a href="/" class="flex items-center p-2">
			<img src={logo} alt="Website logo" class="block size-5 relative" />
			<span class="ml-1 font-mona font-bold">MARI CODEJAM</span>
		</a>
	</Sidebar.Header>
	<Sidebar.Content class="pl-5">
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each menu as { name, url, subMenu }}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href={url} {...props}>
									<span
										class={[
											"block w-full",
											url == page.url.pathname && "underline",
										]}>{name}</span
									>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if subMenu?.length}
							<Sidebar.MenuSub>
								{#each subMenu as subItem}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton>
											{#snippet child({ props })}
												<a href={subItem.url} {...props}>
													<span
														class={[
															"block w-full",
															subItem.url == page.url.pathname && "underline",
														]}>{subItem.name}</span
													>
												</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
