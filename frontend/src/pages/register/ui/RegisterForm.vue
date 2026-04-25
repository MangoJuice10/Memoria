<script setup lang="ts">
import {ref} from "vue";
import {registerSchema} from "@/features/auth";
import {useValidation} from "@/shared/lib";
import {FormField} from "@/shared/ui";
import {Button} from "@/shared/ui";
import LocalizedLink from "@/shared/ui/LocalizedLink.vue";
import Error from "@/shared/ui/Error.vue";

const data = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const {isValid, getFirstError, isTouched, touch, validate, reset} = useValidation(data, registerSchema, {
  mode: "eager",
  delay: 300
});

const loading = ref(false);

const submit = () => {

};
</script>

<template>
  <form @submit.prevent="submit"
        class="w-[35vw] p-5 border rounded-lg border-default bg-tertiary"
        data-testid="register-form">
    <div class="flex justify-center items-center gap-5 mb-3">
      <LocalizedLink to="/login">
        <h2 class="text-muted hover:text-default">{{ $t("auth.login.heading") }}</h2>
      </LocalizedLink>
      <LocalizedLink to="/register">
        <h2 class="underline">{{ $t("auth.register.heading") }}</h2>
      </LocalizedLink>
    </div>
    <Error :error="'TODO'" class="mb-5"
           data-testid="auth-error"/>
    <div class="flex flex-col gap-4">
      <FormField id="email"
                 v-model="data.email"
                 :label="$t('auth.register.email.title')"
                 :placeholder="$t('auth.register.email.placeholder')"
                 :touched="isTouched('email')"
                 :error="getFirstError('email')"
                 @blur="() => {
                   validate();
                   touch('email');
                 }"/>
      <FormField id="password"
                 v-model="data.password"
                 :label="$t('auth.register.password.title')"
                 :placeholder="$t('auth.register.password.placeholder')"
                 type="password"
                 :touched="isTouched('password')"
                 :error="getFirstError('password')"
                 @blur="() => {
                   validate();
                   touch('password');
                 }"/>
      <FormField id="confirmPassword"
                 v-model="data.confirmPassword"
                 :label="$t('auth.register.confirmPassword.title')"
                 :placeholder="$t('auth.register.confirmPassword.placeholder')"
                 type="password"
                 :touched="isTouched('confirmPassword')"
                 :error="getFirstError('confirmPassword')"
                 @blur="() => {
                   validate();
                   touch('confirmPassword');
                 }"/>
      <div class="flex justify-between items-center">
        <Button type="submit" class="w-40 h-9 font-semibold" :disabled="!isValid || loading"
                data-testid="submit">
          {{ $t("auth.login.action") }}
        </Button>
        <Button @click.prevent="reset" type="reset" class="w-20 h-9 font-semibold"
                data-testid="reset">
          {{ $t("auth.login.reset") }}
        </Button>
      </div>
    </div>
  </form>
</template>