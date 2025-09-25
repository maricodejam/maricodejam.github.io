<script lang="ts">
	import logo from "$lib/assets/codejam_logo3.svg";
	import programmerLogo from "$lib/assets/programmer.svg";
	import { buttonVariants, Button } from "$lib/components/ui/button/index";
	let club: HTMLElement;
</script>

<article class="my-40 md:my-20 mx-auto">
	<div class="block w-50 border-outline mx-auto border-5 rounded-xl">
		<img src={logo} class="block w-full h-auto" alt="Codejam Logo" />
	</div>
	<h1 class="text-center uppercase font-bold text-2xl">CodeJam Club</h1>
	<p class="text-center text-xl text-muted-foreground">
		Official Marianopolis CodeJam Website.
	</p>
	<div class="my-2 flex mx-auto justify-center gap-2">
		<Button onclick={() => club.scrollIntoView({ behavior: "smooth" })}
			>The Club</Button
		>
		<a href="lessons" class={buttonVariants({ variant: "outline" })}>Lessons</a>
	</div>
</article>

<article id="club" bind:this={club} class="max-w-xl mx-auto">
	<img
		src={programmerLogo}
		class="block w-40 aspect-square mx-auto"
		alt="A programmer"
	/>
	<h1 class="font-bold font-roboto text-2xl scroll-m-0">
		What is the Marianopolis CodeJam Club:
	</h1>
	<p class="text-muted-foreground">
		The marianopolis codejam club is a club specialized in competitive
		programming club that aims to solve challenges and problems regarding
		computer. In this club we want to help you learn how to code and to solve
		competitive programming questions.
	</p>
</article>
