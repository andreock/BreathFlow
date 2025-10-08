<script lang="ts">
	import { Navbar, NavBrand, Button, Select, Alert } from 'flowbite-svelte';
	import BallAnimation from '$lib/BallAnimation.svelte';
	import NumberPicker from '$lib/NumberPicker.svelte';
	import { resolve } from '$app/paths';

	let start_animation = $state(false);
	let stop_requested = $state(false);

	let scale_in = $state(1);
	let scale_wait1 = $state(2);
	let scale_out = $state(1);
	let scale_wait2 = $state(2);

	let selected = $state('');

	const sounds = [
		// { value: 'respiro', name: 'Respiro', src: resolve('/audio/breath.mp3'), ref: null },
		{ value: 'oceano', name: 'Oceano', src: resolve('/audio/ocean.mp3'), ref: null },
		{ value: 'piano', name: 'Piano', src: resolve('/audio/piano.mp3'), ref: null }
	];

	const tempi = [{ value: '4-4-4-4', name: '4-4-4-4' }];

	let selected_time = $state('');

	$effect(() => {
		let time_split = selected_time.split('-');
		if (time_split.length < 4) return;

		scale_in = +time_split[0];
		scale_wait1 = +time_split[1];
		scale_out = +time_split[2];
		scale_wait2 = +time_split[3];
	});

	let exercise_duration: number = $state(1);

	function start_animation_func() {
		if (start_animation) {
			stop_requested = true;
			return;
		}
		start_animation = true;
		const option = sounds.find((o) => o.value === selected);
		if (option && option.ref) {
			option.ref.currentTime = 0;
			option.ref.play();
		}
	}

	function finish_animation() {
		start_animation = false;
		stop_requested = false;
		options.forEach((option) => {
			if (option.ref) {
				option.ref.pause();
				option.ref.currentTime = 0;
			}
		});
	}
</script>

<div class="flex flex-col justify-center gap-4">
	<Navbar class="bg-primary-500 dark:bg-primary-700">
		<NavBrand href={resolve('/')} class="flex items-center justify-center text-center">
			<p class="text-xl font-semibold whitespace-nowrap text-white">BreathFlow</p>
		</NavBrand>
	</Navbar>

	{#if stop_requested}
		<Alert color="green">Sto interrompendo l'esercizio...</Alert>
	{/if}

	<div class="mt-22">
		<BallAnimation
			scale_in={scale_in * 1000}
			scale_wait1={scale_wait1 * 1000}
			scale_out={scale_out * 1000}
			scale_wait2={scale_wait2 * 1000}
			{start_animation}
			{stop_requested}
			finish={finish_animation}
			duration={exercise_duration * 60 * 1000}
		/>
	</div>

	<div class="mr-3 ml-3">
		<Select
			bind:value={selected_time}
			placeholder="Scegli un preset oppure imposta un tempo"
			items={tempi}
			disabled={start_animation}
		/>
	</div>
	<div class="flex">
		<NumberPicker bind:quantity={scale_in} disabled={start_animation} />
		<NumberPicker bind:quantity={scale_wait1} disabled={start_animation} />
		<NumberPicker bind:quantity={scale_out} disabled={start_animation} />
		<NumberPicker bind:quantity={scale_wait2} disabled={start_animation} />
	</div>

	<div class="mt-2 mr-3 ml-3">
		<Select
			bind:value={selected}
			placeholder="Scegli un suono"
			items={sounds}
			disabled={start_animation}
		/>
	</div>

	<p class="text-center text-lg font-semibold text-white">
		Scegli per quanti minuti ripetere l'esercizio
	</p>
	<NumberPicker bind:quantity={exercise_duration} disabled={start_animation} />

	<Button class="m-3" color="green" onclick={start_animation_func}>
		{start_animation && !stop_requested ? 'Stop' : 'Start'}
	</Button>

	{#each sounds as option}
		<audio src={option.src} loop bind:this={option.ref}></audio>
	{/each}
</div>
