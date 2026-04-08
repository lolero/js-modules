<script context="module" lang="ts">
  export const ssr = false;
</script>

<script lang="ts">
  import '../app.css';
  import 'material-icons/iconfont/material-icons.css';
  import { onMount } from 'svelte';
  import ErrorModal from '$c/ErrorModal.svelte';
  import Navbar from '$c/Navbar.svelte';
  import { auth, getUser } from '$s/auth';

  $: user = $auth.user;

  onMount(() => {
    if (user === null) {
      getUser();
    }
  });
</script>

<ErrorModal />
<div class="container mx-auto h-screen">
  <Navbar />
  <slot />
</div>
