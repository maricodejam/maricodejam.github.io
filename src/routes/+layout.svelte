<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/codejam_logo.png";
	import logo from "$lib/assets/codejam_logo3.svg";
	import { ModeWatcher, toggleMode } from "mode-watcher";
	import * as Sidebar from "$lib/components/ui/sidebar/index";
	import AppSidebar from "$lib/components/AppSidebar.svelte";
	import DiscordLogo from "$lib/components/svg/discord.svelte";
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import { Button } from "$lib/components/ui/button/index";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset class="flex">
		<header
			class="flex min-h-15 w-full sticky top-0 bg-background p-2 items-center justify-between border-b-border border-b-2"
		>
			<div class="flex items-center">
				<Sidebar.Trigger class="mr-2" />
				<!-- This href is necessary on github-->
				<a href="/" class="flex items-center">
					<img src={logo} alt="Website logo" class="block size-5 relative" />
					<span class="ml-1 font-mona font-bold">MARI CODEJAM</span>
				</a>
			</div>
			<Button
				onclick={toggleMode}
				variant="outline"
				size="icon"
				class="size-5 rounded-xs"
			>
				<SunIcon
					class="rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
				/>
				<MoonIcon
					class="absolute rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
				/>
			</Button>
		</header>
		<main class="p-2 flex-1">
			{@render children?.()}
		</main>
		<footer
			class="min-h-15 flex p-2 bg-background border-t-2 border-t-border sticky bottom-0"
		>
			<span class="uppercase font-bold">Join us:</span>
			<div class="flex-1 flex justify-between px-4">
				<a
					href="https://discord.gg/3fyjsEGY"
					target="_blank"
					class="flex group justify-baseline"
				>
					<DiscordLogo
						class="w-6 h-6 fill-foreground group-hover:fill-[#728CD7]"
					/>
					<span class="group-hover:text-[#728CD7]">Discord</span>
				</a>
			</div>
		</footer>
	</Sidebar.Inset>
</Sidebar.Provider>
