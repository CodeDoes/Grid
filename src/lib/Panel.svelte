<script lang="ts">
  export let direction: "u" | "d" | "l" | "r" | "" = ""
  direction
  let cls: string = ""
  let styl: string = ""
  export { cls as class, styl as style }
  function resizeHandle(
    node: HTMLDivElement,
    direction: "l" | "r" | "u" | "d"
  ) {
    // Horizontal resize handle to right
    function mouseDown(e: MouseEvent) {
      const initialClient = { x: e.clientX, y: e.clientY }

      const parent = node.parentElement!
      const initialSize = {
        width: parent.offsetWidth,
        height: parent.offsetHeight,
      }
      function mouseMouse(e: MouseEvent) {
        const delta = {
          x: e.clientX - initialClient.x,
          y: e.clientY - initialClient.y,
        }
        if (direction === "l") delta.x = -delta.x
        if (direction === "u") delta.y = -delta.y
        if (direction === "l" || direction === "r")
          parent.style.width = `${initialSize.width + delta.x}px`
        if (direction === "u" || direction === "d")
          parent.style.height = `${initialSize.height + delta.y}px`
        console.log(delta)
      }
      function mouseUp(e: MouseEvent) {
        document.removeEventListener("mousemove", mouseMouse)
        document.removeEventListener("mouseup", mouseUp)
      }
      document.addEventListener("mousemove", mouseMouse)
      document.addEventListener("mouseup", mouseUp)
    }
    node.addEventListener("mousedown", mouseDown)
    return {
      destroy() {
        node.removeEventListener("mousedown", mouseDown)
      },
    }
  }
</script>

<div
  class="panel {cls}"
  style={styl}
  class:vbox={["u", "d"].includes(direction)}
  class:hbox={["l", "r"].includes(direction)}
>
  {#if ["u", "l"].includes(direction) && direction != ""}
    <div class="resize-handle" use:resizeHandle={direction} />
  {/if}
  <div class="panel-inner">
    <slot />
  </div>

  {#if ["d", "r"].includes(direction) && direction != ""}
    <div class="resize-handle" use:resizeHandle={direction} />
  {/if}
</div>

<style>
  .resize-handle {
    min-width: 1rem;
    min-height: 1rem;
    background-color: #020;
  }
  .resize-handle-small {
    min-width: 0.5rem;
    min-height: 0.5rem;
    background-color: #040;
  }
  .hbox > .resize-handle {
    cursor: col-resize;
  }
  .vbox > .resize-handle {
    cursor: row-resize;
  }
  .panel {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    min-width: 1rem;
    min-height: 1rem;
  }
  .panel-min-small {
    min-width: 0.5rem;
    min-height: 0.5rem;
  }
  .panel-min-min-content {
    min-width: min-content;
    min-height: min-content;
  }
  .panel-min-0 {
    min-width: 0;
    min-height: 0;
  }
  .border-none {
    border: none;
  }
  .flex-spring {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .panel-inner {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    box-sizing: border-box;
    min-height: 0;
    min-width: 0;
    height: auto;
    max-height: 100%;
    max-width: 100%;
  }
</style>
