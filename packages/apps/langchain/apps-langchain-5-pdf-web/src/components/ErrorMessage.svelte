<script lang="ts">
  export let message = '';

  function setDoc(node: HTMLIFrameElement, messageContent: string) {
    node.srcdoc = messageContent;
    return {
      update(messageContentUpdated: string) {
        node.srcdoc = messageContentUpdated;
      },
    };
  }
</script>

<iframe class="h-full w-full" title="err" use:setDoc={message} />
