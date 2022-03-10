<script lang="ts">
  import "./lib/style.css";
  import { handleDrop } from "./lib/functions";
</script>

<main>
  <div on:drop|preventDefault={handleDrop} on:dragover|preventDefault>
    <h1>파일을 여기에 끌어다 놓으세요.</h1>
    <p>자소가 분리된 파일명을 수정해 다운로드 형태로 제공합니다.</p>
  </div>
</main>
