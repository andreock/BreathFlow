<script lang="ts">
	import { Navbar, NavBrand, Button } from "flowbite-svelte";
	import BallAnimation from '$lib/BallAnimation.svelte';
	import NumberPicker from '$lib/NumberPicker.svelte';

	let start_animation = $state(false);
	let scale_in = $state(1);
	let scale_wait1 = $state(2);
	let scale_out = $state(1);
	let scale_wait2 = $state(2);
</script>

<div class="flex flex-col gap-4">

<Navbar class="bg-primary-500 dark:bg-primary-700">
	<NavBrand href="/" class="flex text-center justify-center items-center">
		<p class="text-xl font-semibold whitespace-nowrap text-white">BreathFlow</p>
	</NavBrand>
</Navbar>

	<div class="mt-12 mb-12">
		<BallAnimation scale_in={scale_in * 1000} scale_wait1={scale_wait1 * 1000}
									 scale_out={scale_out * 1000} scale_wait2={scale_wait2 * 1000}
									 bind:start_animation finish={() => start_animation = false}
		/>
	</div>

	<div class="flex m-2">
		<NumberPicker bind:quantity={scale_in} bind:disabled={start_animation} />
		<NumberPicker bind:quantity={scale_wait1} bind:disabled={start_animation} />
		<NumberPicker bind:quantity={scale_out} bind:disabled={start_animation} />
		<NumberPicker bind:quantity={scale_wait2} bind:disabled={start_animation} />
	</div>

	<Button class="m-4" color="green" onclick={() => start_animation = !start_animation}>
		{start_animation ? 'Stop' : 'Start'}
	</Button>

</div>
