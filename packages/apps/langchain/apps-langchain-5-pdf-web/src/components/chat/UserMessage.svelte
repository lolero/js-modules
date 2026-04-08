<script lang="ts">
  import purify from 'dompurify';
  import { marked } from 'marked';

  export let content = '';
</script>

<div
  class="message border rounded-md py-1 px-2.5 my-0.25 break-words self-end bg-slate-200"
>
  <!-- svelte/no-at-html-tags flags every {@html} use and can't detect the
       purify.sanitize() wrapper below; disabling is safe here. -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html purify.sanitize(marked(content, { breaks: true, gfm: true }))}
</div>

<style>
  .message {
    max-width: 80%;
  }
</style>
