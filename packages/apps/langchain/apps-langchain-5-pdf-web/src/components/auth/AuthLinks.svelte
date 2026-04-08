<script lang="ts">
  import { auth } from '$s/auth';
  import { resolve } from '$app/paths';
</script>

{#if $auth.user}
  <a
    class="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
    href={resolve('/auth/signout')}>Sign Out</a
  >
{:else}
  <a
    class="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
    href={resolve('/auth/signin')}>Login</a
  >
  <a
    class="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
    href={resolve('/auth/signup')}>Sign Up</a
  >
{/if}
