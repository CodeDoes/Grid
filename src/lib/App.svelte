<script lang="ts">
  import Panel from "$lib/Panel.svelte"
  Panel
</script>

<div class="app-container">
  <Panel class="panel-left" direction="r">
    <slot name="left">LEFT</slot>
  </Panel>
  <Panel class="panel-right" direction="l">
    <slot name="right">RIGHT</slot>
  </Panel>
  <div class="panel-main">
    <slot name="main">MAIN</slot>
  </div>
  <Panel class="panel-bottom" direction="u">
    <slot name="bottom">BOTTOM</slot>
  </Panel>
</div>

<style>
  /* .app-container > :first-child {
    flex-grow: 1;
    box-sizing: border-box;
  } */
  .app-container > :global(.panel-main) {
    grid-area: M;
  }
  .app-container > :global(.panel-left) {
    grid-area: L;
  }
  .app-container > :global(.panel-right) {
    grid-area: R;
  }
  .app-container > :global(.panel-bottom) {
    grid-area: B;
  }
  .app-container {
    box-sizing: border-box;
    overflow: auto;
    display: grid;

    grid-template-columns:
      minmax(0, min-content)
      minmax(10rem, auto)
      minmax(0, min-content);
    grid-template-rows:
      minmax(0, min-content)
      minmax(10rem, 1fr)
      minmax(0, min-content);
    grid-template-areas:
      "T T T"
      "L M R"
      "B B B";
    height: 100vh;
    width: 100vw;
    user-select: none;
  }
</style>
