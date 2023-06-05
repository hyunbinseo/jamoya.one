<script lang="ts">
	import { slide } from 'svelte/transition';
	import './app.css';
	import Badge from './assets/Badge.svelte';
	import BackhandIndexPointingRight from './assets/emoji/1F449.svelte';
	import { downloadFiles, downloadItems } from './lib';

	const { VITE_GITHUB } = import.meta.env;

	let badgeIsLoaded = false;

	let filesAreDraggedOver = false;

	const handleDragOver = (e: DragEvent) => {
		filesAreDraggedOver = true;
		e.dataTransfer.dropEffect = 'copy';
	};

	const handleDragLeave = () => {
		filesAreDraggedOver = false;
	};

	const handleDrop = ({ dataTransfer: { items, files } }: DragEvent) => {
		if (items) {
			downloadItems(items);
		} else {
			downloadFiles(files);
		}
		// on:dragleave might not be called, even if files are downloaded
		// e.g. Chromium permission - Site wants to: Download multiple files
		filesAreDraggedOver = false;
	};

	let fileInput: HTMLInputElement;

	const handleFileChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		downloadFiles(input.files);
		input.value = '';
	};

	const handleTextInput = `javascript:(()=>{let p=window.prompt("자소가 분리된 문자열을 붙여 넣으세요.");window.prompt("다음 값을 복사해 사용하세요.",p.normalize("NFC"))})();`;
</script>

<div
	class="fixed inset-0 flex select-none flex-col py-6 transition-colors sm:py-12 md:py-16"
	class:bg-zinc-100={filesAreDraggedOver}
	class:dark:bg-zinc-900={!filesAreDraggedOver}
	class:dark:bg-zinc-800={filesAreDraggedOver}
	on:dragover|preventDefault|stopPropagation={handleDragOver}
>
	{#if !filesAreDraggedOver}
		<header transition:slide class="px-6">
			<nav aria-label="Tabs" class="mx-auto max-w-xs">
				<ul class="flex gap-x-6 text-sm text-zinc-600 dark:text-zinc-300">
					<li>자모야 모여라</li>
					<li class="ml-auto">
						<span class="border-b-2 pb-2">파일</span>
					</li>
					<li>
						<a href={handleTextInput} class="hover:text-teal-600">텍스트</a>
					</li>
				</ul>
			</nav>
		</header>
	{/if}
	<main class="flex flex-grow flex-col justify-center text-center">
		{#if !filesAreDraggedOver}
			<h1
				transition:slide
				class="text-2xl text-zinc-800 dark:text-zinc-100 md:text-3xl"
			>
				<span>ㅍㅏㅇㅣㄹㅁㅕㅇ</span>
				<!-- SVG positioning from https://blog.prototypr.io/d44b3d7b26b4 -->
				<span
					class="relative top-0.5 inline-flex h-6 w-6 self-center md:h-7 md:w-7"
				>
					<!-- Emoji from https://github.com/sensadesign/sensaemoji -->
					<BackhandIndexPointingRight />
				</span>
				<span>파일명</span>
			</h1>
		{/if}
		<p
			class="mt-4 text-base"
			class:text-zinc-600={!filesAreDraggedOver}
			class:text-zinc-700={filesAreDraggedOver}
			class:dark:text-zinc-300={!filesAreDraggedOver}
			class:dark:text-zinc-200={filesAreDraggedOver}
		>
			{#if !filesAreDraggedOver}
				<input
					class="hidden"
					type="file"
					multiple
					bind:this={fileInput}
					on:change={handleFileChange}
				/>
				<button
					type="button"
					class="text-teal-600 hover:text-teal-700 dark:hover:text-teal-500"
					on:click={() => fileInput?.click()}
				>
					파일(들)을 선택하거나
				</button>
				이곳에 끌어다 놓으세요.
			{:else}
				끌어온 폴더와 파일을 이곳에 내려놓으세요.
			{/if}
		</p>
	</main>
	{#if !filesAreDraggedOver}
		<footer transition:slide class="px-6">
			<nav class="mx-auto max-w-xs">
				<ul class="flex gap-x-6 text-sm text-zinc-600 dark:text-zinc-300">
					<li>
						<a
							target="_blank"
							href="{VITE_GITHUB}#readme"
							class="hover:text-teal-600"
						>
							소개
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="https://www.npmjs.com/package/jamoya-one"
							class="hover:text-teal-600"
						>
							CLI
						</a>
					</li>
					<li class="ml-auto">
						{#if !badgeIsLoaded}
							<Badge />
						{/if}
						<a
							target="_blank"
							href="{VITE_GITHUB}/stargazers"
							class:hidden={!badgeIsLoaded}
						>
							<img
								width="88"
								height="20"
								alt="GitHub Repo stars"
								on:load={() => (badgeIsLoaded = true)}
								src="https://img.shields.io/github/stars/hyunbinseo/jamoya.one?style=social"
							/>
						</a>
					</li>
				</ul>
			</nav>
		</footer>
	{/if}
</div>

{#if filesAreDraggedOver}
	<div
		class="fixed inset-0"
		on:dragover|preventDefault|stopPropagation
		on:dragleave|preventDefault|stopPropagation={handleDragLeave}
		on:drop|preventDefault|stopPropagation={handleDrop}
	/>
{/if}
