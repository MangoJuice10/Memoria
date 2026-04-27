<script setup lang="ts">
import {ref} from "vue";
import {registerSchema} from "@/pages/register/model/register.schema";
import {useValidation} from "@/shared/lib";
import {FormField} from "@/shared/ui";
import {Button} from "@/shared/ui";
import {LocalizedLink} from "@/shared/ui";
import Error from "@/shared/ui/Error.vue";
import {useViewerStore} from "@/entities/viewer";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const viewer = useViewerStore();
const router = useRouter();
const route = useRoute();
const {t} = useI18n();

const data = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const {
  isValid,
  getFirstError,
  isTouched,
  touch,
  touchAll,
  validate,
  reset: resetForm
} = useValidation(data, registerSchema, {
  mode: "eager",
  delay: 300
});

const authError = ref<string | null>(null);

const submit = async () => {
  await validate();
  touchAll();
  if (!isValid.value) return;
  try {
    await viewer.register(data.value.email, data.value.password, data.value.confirmPassword);
    authError.value = null;

    await router.push({
      name: "home",
      params: route.params,
      query: route.query,
      hash: route.hash
    });
  } catch {
    authError.value = t("auth.register.errors.failure");
  }
};

const resetAll = () => {
  authError.value = null;
  resetForm();
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
    <Error :error="authError" class="mb-5"
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
        <Button type="submit" class="w-40 h-9 font-semibold" :disabled="!isValid"
                data-testid="submit">
          {{ $t("auth.login.action") }}
        </Button>
        <Button @click.prevent="resetAll" type="reset" class="w-20 h-9 font-semibold"
                data-testid="reset">
          {{ $t("auth.login.reset") }}
        </Button>
      </div>
    </div>
  </form>
</template>