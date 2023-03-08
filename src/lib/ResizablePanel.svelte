<script lang="ts">
  // let handleElement: HTMLDivElement
  let mainElement: HTMLDivElement
  export let axis: "x" | "y"
  function onMouseDown(e) {
    function onMouseMove(e) {}
    function onMouseUp(e) {
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mousemove", onMouseMove)
    }
    mainElement.addEventListener("mousemove", onMouseMove)
    mainElement.addEventListener("mouseup", onMouseUp)
  }
</script>

<div
  class="user-select-none vbox h-100vh split-panel"
  bind:this={mainElement}
  on:mousedown={onMouseDown}
>
  <slot />
  <div class="handle" />
</div>

<style>
  /* .split-panel{
      
    } */
  .split-panel > *:first-child {
  }
  .handle {
    background-color: green;
    min-width: 1rem;
    min-height: 1rem;
  }
</style>
