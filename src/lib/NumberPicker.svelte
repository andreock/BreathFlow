<script lang="ts">
	import { Input, ButtonGroup } from 'flowbite-svelte';
	let { quantity = $bindable(), disabled } = $props();
</script>

<form class="mx-auto max-w-xs">
	<div class="relative flex max-w-[8rem] items-center">
		<ButtonGroup>
			<Input
				{disabled}
				bind:value={quantity}
				type="number"
				id="quantity-input"
				aria-describedby="helper-text-explanation"
				placeholder="0"
				required
				min="0"
				class="w-20 text-center"
			/>
		</ButtonGroup>
	</div>
</form>
