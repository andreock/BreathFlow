<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

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

	let total_duration = scale_in + scale_wait1 + scale_out + scale_wait2;
	const scale = tweened(1, { duration: 4000, easing: cubicOut });

	async function animateBall() {
		// Gonfia
		await scale.set(2, { duration: scale_in, easing: cubicOut });

		// Ferma
		await scale.set(2, { duration: scale_wait1 });

		// Sgonfia
		await scale.set(1, { duration: scale_out, easing: cubicOut });

		// Ferma
		await scale.set(1, { duration: scale_wait2 });
	}

	let task_id: Timeout | null = null;
	function animate_wrapper() {
		animateBall(); // Start immediately
		task_id = setInterval(async () => {
			if (duration <= 0 || stop_requested) {
				finish();
				clearInterval(task_id);
				return;
			}
			duration -= total_duration;
			await animateBall();
		}, total_duration);
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
