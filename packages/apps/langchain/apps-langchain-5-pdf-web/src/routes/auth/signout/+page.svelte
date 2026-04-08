<script lang="ts">
  import { onMount } from 'svelte';
  import { clearErrors, signout } from '$s/auth';
  import { beforeNavigate, goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  let timeout: number | null = null;

  onMount(async () => {
    await signout();

    timeout = setTimeout(() => {
      goto(resolve('/'));
    }, 2500);
  });

  beforeNavigate(() => {
    clearErrors();
    if (timeout) {
      clearTimeout(timeout);
    }
  });
</script>

<main class="w-full max-w-md mx-auto p-6">
  <div
    class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-4 sm:p-7">
      <div class="text-center">
        Sad to see you go!
        <p>Redirecting...</p>
      </div>
    </div>
  </div>
</main>
