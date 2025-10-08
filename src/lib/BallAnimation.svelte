<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { delay } from '$lib';
	import Timer from './Timer.svelte';

	let {
		scale_in,
		scale_wait1,
		scale_out,
		scale_wait2,
		start_animation,
		stop_requested,
		finish,
		duration
	} = $props();

	const scale = tweened(1);

	function check_stop() {
		if (stop_requested) {
			finish();
			return true;
		}
		return false;
	}

	let time_for_timer = $state(0);
	let run_timer = $state(false);

	async function animateBall(first_run: boolean) {
		if (first_run) {
			await scale.set(1);
		}

		// Gonfia
		await scale.set(2, { duration: scale_in });
		if (check_stop()) return;

		// Wait
		time_for_timer = scale_wait1;
		run_timer = true;
		await delay(scale_wait1);
		run_timer = false;
		if (check_stop()) return;

		// Sgonfia
		await scale.set(1, { duration: scale_out });
		if (check_stop()) return;

		// Wait
		time_for_timer = scale_wait2;
		run_timer = true;
		await delay(scale_wait2);
		run_timer = false;
		if (check_stop()) return;

		if (!stop_requested) {
			animateBall(false);
		}
	}

	function animate_wrapper() {
		animateBall(true); // Start immediately
		setTimeout(() => {
			stop_requested = true;
		}, duration - 1000); // Request stop 1 second before the end to be safe

		return ''; // Avoid return in the UI
	}
</script>

{#if start_animation}
	{animate_wrapper()}
{/if}

<div
	class="polish_effect mx-auto my-10 h-36 w-36 rounded-full bg-white
						shadow-lg transition-shadow duration-300"
	style="transform: scale({$scale});"
></div>

<br />
<div class="mt-8 flex justify-center">
	{#if run_timer}
		<Timer timer={time_for_timer} />
	{:else}
		<div class="h-12 w-12"></div>
	{/if}
</div>

<style>
	.polish_effect {
		background:
			radial-gradient(
				ellipse at 30% 25%,
				rgba(255, 255, 255, 0.8) 0%,
				rgba(255, 255, 255, 0.3) 30%,
				transparent 70%
			),
			radial-gradient(circle at 35% 35%, #ffffff 55%, #f5f5f5 75%, #e8e8e8 90%, #d0d0d0 100%);
		box-shadow:
			0 8px 32px 0 rgba(30, 40, 80, 0.35),
			0 4px 16px 0 rgba(0, 0, 0, 0.25),
			0 2px 8px 0 rgba(0, 0, 0, 0.15),
			inset 0 -2px 4px 0 rgba(0, 0, 0, 0.08),
			inset 0 -6px 12px 0 rgba(0, 0, 0, 0.12),
			inset 0 6px 20px 0 rgba(255, 255, 255, 0.9),
			inset 0 2px 6px 0 rgba(255, 255, 255, 0.7),
			inset -3px -3px 8px 0 rgba(0, 0, 0, 0.06),
			inset 3px 3px 8px 0 rgba(255, 255, 255, 0.4);
		position: relative;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}
</style>
