<script lang="ts">
  import Panel from "$lib/Panel.svelte"
</script>

<div class="split-container">
  <slot>
    <Panel direction="d"><slot name="1">1</slot></Panel>
    <Panel><slot name="2">2</slot></Panel>
  </slot>
</div>

<style>
  .split-container {
    overflow: hidden;
    display: grid;
    height: 100%;
    grid-template-rows: minmax(0, auto) minmax(0, 1fr);
    grid-template-areas: "." ".";
  }
</style>
