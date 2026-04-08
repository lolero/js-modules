<script lang="ts">
  import Alert from '$c/Alert.svelte';
  import Button from '$c/Button.svelte';
  import FormGroup from '$c/FormGroup.svelte';
  import TextInput from '$c/TextInput.svelte';
  import { auth, clearErrors, signin } from '$s/auth';
  import { beforeNavigate, goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  let email = '';
  let password = '';

  function handleSubmit() {
    signin(email, password);
  }

  $: if ($auth.user) {
    goto(resolve('/'));
  }

  beforeNavigate(clearErrors);
</script>

<main class="w-full max-w-md mx-auto p-6">
  <div
    class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800">Sign In</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Don't have have an account?
          <a
            class="text-blue-600 decoration-2 hover:underline font-medium"
            href={resolve('/auth/signup')}
          >
            Sign Up Here
          </a>
        </p>
      </div>

      <div class="mt-5">
        <form on:submit|preventDefault={handleSubmit}>
          <div class="grid gap-y-4">
            <FormGroup label="Email">
              <TextInput bind:value={email} type="email" />
            </FormGroup>

            <FormGroup label="Password">
              <TextInput bind:value={password} type="password" />
            </FormGroup>

            {#if $auth.error}
              <Alert>Error: {$auth.error}</Alert>
            {/if}

            <Button>Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
