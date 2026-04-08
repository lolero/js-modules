<script lang="ts">
  import { onMount } from 'svelte';
  import type { User } from '$s/auth';
  import { auth, getUser } from '$s/auth';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  async function checkAuth(user: User) {
    if (user === false) {
      goto(resolve('/auth/signin'));
    }
  }
  $: user = $auth.user;
  $: checkAuth($auth.user);

  onMount(() => {
    if (user === null) {
      getUser();
    }
  });
</script>
