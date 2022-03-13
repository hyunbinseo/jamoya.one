<script lang="ts">
  import { slide } from "svelte/transition";

  import "./lib/style.css";
  import { downloadFiles, downloadItems } from "./lib/functions";

  const { VITE_GITHUB_URL } = import.meta.env;

  let isDraggedOver = false;

  const handleDragOver = (e: DragEvent) => {
    isDraggedOver = true;
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = () => {
    isDraggedOver = false;
  };

  const handleDrop = ({ dataTransfer: { items, files } }: DragEvent) => {
    if (items) {
      downloadItems(items);
    } else {
      downloadFiles(files);
    }
    // on:dragleave might not be called, even if files are downloaded
    // e.g. Chromium permission - Site wants to: Download multiple files
    isDraggedOver = false;
  };

  let fileInput: HTMLInputElement;

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const { files } = input;
    downloadFiles(files);
    input.value = "";
  };
</script>

<div
  class="pointer-events-auto fixed inset-0 flex select-none flex-col bg-white pt-16 pb-12 transition-colors dark:bg-slate-800"
  class:bg-gray-300={isDraggedOver}
  class:dark:bg-slate-700={isDraggedOver}
  on:dragover|preventDefault|stopPropagation={handleDragOver}
  on:dragleave|preventDefault|stopPropagation={handleDragLeave}
  on:drop|preventDefault|stopPropagation={handleDrop}
>
  <main
    class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="text-center">
      {#if !isDraggedOver}
        <h1
          transition:slide
          class="text-5xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100"
        >
          자소 분리 해결
        </h1>
      {/if}
      <p class="mt-4 text-base text-gray-500 dark:text-gray-400">
        {#if !isDraggedOver}
          <input
            class="hidden"
            type="file"
            multiple
            bind:this={fileInput}
            on:change={handleFileChange}
          />
          <button
            type="button"
            class="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            on:click={() => fileInput?.click()}
          >
            파일을 선택하거나
          </button>
          이곳에 끌어다 놓으세요.
        {:else}
          끌어온 폴더와 파일을 이곳에 내려놓으세요.
        {/if}
      </p>
    </div>
  </main>
  {#if !isDraggedOver}
    <footer
      transition:slide
      class="mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8"
    >
      <nav
        class="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
      >
        <a
          href="{VITE_GITHUB_URL}#readme"
          class="hover:text-gray-600 dark:hover:text-gray-300"
        >
          도구 소개
        </a>
        <span
          class="inline-block border-l border-gray-300"
          aria-hidden="true"
        />
        <a
          href="{VITE_GITHUB_URL}/discussions"
          class="hover:text-gray-600 dark:hover:text-gray-300"
        >
          문의 제안
        </a>
        <span
          class="inline-block border-l border-gray-300"
          aria-hidden="true"
        />
        <a
          href="{VITE_GITHUB_URL}/issues"
          class="hover:text-gray-600 dark:hover:text-gray-300"
        >
          오류 제보
        </a>
      </nav>
    </footer>
  {/if}
</div>
