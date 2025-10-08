<script lang="ts">
	import { delay } from '$lib';
	import { onMount } from 'svelte';

	let { timer } = $props();

	let initial_timer: object[] = $state([]);

	async function main() {
		console.log(initial_timer);
		while (timer > 0) {
			let current_circle = initial_timer.map((el) => el.time).indexOf(timer / 1000);
			if (current_circle != -1) {
				initial_timer[current_circle].visible = true;
				initial_timer = initial_timer;
			}
			await delay(1000);
			timer -= 1000;
		}
	}

	onMount(async () => {
		for (let i = 1; i != timer / 1000 + 1; i++) {
			// time starts from 1
			initial_timer.push({ time: i, visible: false });
		}
		await main();
	});
</script>

<div class="flex space-x-1">
	{#each initial_timer as circle_time}
		{#if circle_time.visible}
			<div class="h-12 w-12 rounded-full bg-white"></div>
		{/if}
	{/each}
</div>
