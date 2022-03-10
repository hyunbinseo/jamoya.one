<script lang="ts">
  import "./lib/style.css";
  import { handleDragOver, handleDrop } from "./lib/functions";
</script>

<div
  class="fixed inset-0 flex select-none flex-col bg-white pt-16 pb-12"
  on:dragover|preventDefault|stopPropagation={handleDragOver}
  on:drop|preventDefault|stopPropagation={handleDrop}
>
  <main
    class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="text-center">
      <h1
        class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
      >
        자소 분리 해결
      </h1>
      <p class="mt-4 text-base text-gray-500">
        <!--         
          <button type="button" class="font-bold hover:text-indigo-600">
            파일을 선택하거나
          </button>
        -->
        파일을 이곳에 끌어다 놓으세요.
      </p>
    </div>
  </main>
  <footer class="mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8">
    <nav class="flex justify-center space-x-4">
      <!--       
        <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-600">
          문자열 수정
        </a>
        <span class="inline-block border-l border-gray-300" aria-hidden="true" />
        <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-600">
          작동 원리
        </a>
        <span class="inline-block border-l border-gray-300" aria-hidden="true" />
       -->
      <a
        target="_blank"
        rel="noopener"
        href="https://github.com/hyunbinseo/mac-filename-kr"
        class="text-sm font-medium text-gray-500 hover:text-gray-600"
      >
        소스코드
      </a>
    </nav>
  </footer>
</div>
