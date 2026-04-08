<script lang="ts">
  import Alert from '$c/Alert.svelte';
  import Button from '$c/Button.svelte';
  import FormGroup from '$c/FormGroup.svelte';
  import TextInput from '$c/TextInput.svelte';
  import { auth, clearErrors, signup } from '$s/auth';
  import { beforeNavigate, goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  let email = '';
  let password = '';
  let passwordConfirm = '';
  let validationError = '';

  function handleSubmit() {
    if (password !== passwordConfirm) {
      validationError = 'Passwords do not match';
      return;
    }
    validationError = '';
    signup(email, password);
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
        <h1 class="block text-2xl font-bold text-gray-800">Sign Up</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <a
            class="text-blue-600 decoration-2 hover:underline font-medium"
            href={resolve('/auth/signin')}
          >
            Sign In Here
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

            <FormGroup label="Confirm Password">
              <TextInput bind:value={passwordConfirm} type="password" />
            </FormGroup>

            {#if validationError}
              <Alert>Error: {validationError}</Alert>
            {:else if $auth.error}
              <Alert>Error: {$auth.error}</Alert>
            {/if}

            <Button>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
