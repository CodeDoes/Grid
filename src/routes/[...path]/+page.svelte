<script lang="ts">
  import App from "$lib/App.svelte"
  import SplitContainer from "$lib/SplitContainer.svelte"
  import Panel from "$lib/Panel.svelte"
  import type { PageData } from "./$types"
  export let data: PageData
  console.log(data)
</script>

<App>
  <div slot="left" class="p-1 overflow-auto">
    <h2>directory</h2>
    <ul class="border-primary">
      {#each data.files as file}
        <li><a href={file}>{file}</a></li>
      {/each}
    </ul>
  </div>
<!-- TODO Column Component which uses grid -->
  <SplitContainer slot="main">
    <div slot="1">
      <h2>file</h2>
      <code class="border-primary">
        {data.file}
      </code>
    </div>
    <div slot=2>CONSOLE</div>
  </SplitContainer>
  <!-- <div slot="main">
  </div> -->
</App>

<style>
  .user-select-none {
    user-select: none;
  }
  .vbox > .handle {
    cursor: col-resize;
  }
  .hbox > .handle {
    cursor: row-resize;
  }
</style>
