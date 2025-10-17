<script lang="ts">
	import * as Chart from "$lib/components/ui/chart/index";
	import { LineChart, Tooltip, Axis, Layer, Area, Highlight } from "layerchart";
	import { ticks } from "d3";
	import { SvelteSet } from "svelte/reactivity";
	import { Slider } from "$lib/components/ui/slider/index";
	import { Label } from "$lib/components/ui/label/index";
	import { Checkbox } from "$lib/components/ui/checkbox/index";

	type Props = {
		domain: [number, number];
		functions: Array<{
			id: number;
			fn: (x: number) => number;
			label?: string;
			color?: string;
		}>;
		hidden?: number[];
		tickLength?: number;
	};
	function filterNonInteger(x: string) {
		return !Number.isNaN(Number.parseInt(x));
	}
	function getChartData(x_value: number[], functions: Props["functions"]) {
		const data = [];

		for (const x of x_value) {
			const point: Record<string | number, number> = { x: x };
			for (const f of functions) {
				point[f.id] = f.fn(x);
			}
			data.push(point);
		}
		return data;
	}
	function getChartConfig(functions: Props["functions"]) {
		const config: Record<string, { label: string; color: string }> = {};
		for (const f of functions) {
			config[f.id.toString()] = {
				label: f.label ?? "",
				color: f.color ?? "",
			};
		}
		return config;
	}

	let {
		domain,
		functions,
		hidden = $bindable([]),
		tickLength = $bindable(1000),
	}: Props = $props();

	let currentDomain = $state(domain);
	const hiddenSet = $derived(new SvelteSet(hidden));
	const x_value = $derived(
		ticks(currentDomain[0], currentDomain[1], tickLength),
	);
	const filteredFunc = $derived(
		functions.filter(({ id }) => !hiddenSet.has(id)),
	);
	// show each data as x, id_1: f_id_1(x), id_2: f_id_2(x)
	const chartData: Record<number, number>[] = $derived.by(() =>
		getChartData(x_value, filteredFunc),
	);

	// each function is there with a key of id and value containing color and label
	const chartConfig = $derived.by(() => getChartConfig(functions));
	const seriesData = $derived.by(() =>
		filteredFunc.map((f) => ({
			key: f.id.toString(),
			label: f.label,
			color: f.color,
		})),
	);
	$inspect(chartConfig, seriesData);
</script>

<div class="w-full flex flex-col">
	<Chart.Container config={chartConfig} class="min-h-[200px] w-full block p-10">
		<LineChart
			data={chartData}
			x="x"
			yDomain={[0, null]}
			yNice
			series={seriesData}
			renderContext="svg"
		>
			{#snippet axis()}
				<Layer type="svg">
					<Axis placement="left" grid rule />
					<Axis placement="bottom" rule />
				</Layer>
			{/snippet}
			{#snippet tooltip()}
				<Tooltip.Root class="bg-secondary text-secondary-foreground rounded">
					{#snippet children({ data })}
						<Tooltip.Header value={`x=${data.x}`}></Tooltip.Header>
						<Tooltip.List>
							{#each Object.keys(data).filter(filterNonInteger) as key}
								<Tooltip.Item
									color={chartConfig[key].color}
									value={`${chartConfig[key].label}=${data[key]}`}
								/>
							{/each}
						</Tooltip.List>
					{/snippet}
				</Tooltip.Root>
			{/snippet}
		</LineChart>
	</Chart.Container>
	<div class="w-full flex gap-2">
		<Label
			>Domain [{currentDomain[0]}, {currentDomain[1]}] <Slider
				class="w-50"
				type="single"
				bind:value={currentDomain[1]}
				min={domain[0]}
				max={domain[1]}
			/></Label
		>
		{#each functions as f}
			<Label
				>{f.label}
				<Checkbox
					checked
					onCheckedChange={(v) => {
						if (!v) hiddenSet.add(f.id);
						else hiddenSet.delete(f.id);
					}}
				/></Label
			>
		{/each}
	</div>
</div>
