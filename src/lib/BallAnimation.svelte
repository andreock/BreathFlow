<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const {
		scale_in = $bindable(), scale_wait1 = $bindable(), scale_out = $bindable(),
		scale_wait2 = $bindable(), start_animation = $bindable(), finish
	} = $props();

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

		finish();
	}

	function animate_wrapper() {
		animateBall();
		return '';	// Avoid return in the UI
	}
</script>

{#if start_animation}
	{animate_wrapper()}
{/if}

<div class="w-36 h-36 bg-white rounded-full shadow-lg my-10 mx-auto
						transition-shadow duration-300 polish_effect" style="transform: scale({$scale});">
</div>

<style>
    .polish_effect {
        background: radial-gradient(ellipse at 30% 25%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 70%),
        radial-gradient(circle at 35% 35%, #ffffff 55%, #f5f5f5 75%, #e8e8e8 90%, #d0d0d0 100%);
        box-shadow: 0 8px 32px 0 rgba(30, 40, 80, 0.35),
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

