<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {loginSchema} from "@/pages/login/model/login.schema";
import Error from "@/shared/ui/Error.vue";
import {FormField} from "@/shared/ui";
import {Button} from "@/shared/ui";
import {useValidation} from "@/shared/lib";
import LocalizedLink from "@/shared/ui/LocalizedLink.vue";
import {useViewerStore} from "@/entities/viewer";

const route = useRoute();
const router = useRouter();
const {t} = useI18n();
const viewer = useViewerStore();

const data = ref({
  email: "",
  password: "",
});

const {
  isValid,
  getFirstError,
  isTouched,
  touch,
  touchAll,
  validate,
  reset: resetForm
} = useValidation(data, loginSchema, {
  mode: "eager",
  delay: 300
});

const authError = ref<string | null>(null);

const submit = async () => {
  await validate();
  touchAll();
  if (!isValid.value) return;
  try {
    await viewer.login(data.value.email, data.value.password);
    authError.value = null;

    await router.push({
      name: "home",
      params: route.params,
      query: route.query,
      hash: route.hash
    });
  } catch {
    authError.value = t("auth.login.errors.failure");
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
        data-testid="login-form">
    <div class="flex justify-center items-center gap-5 mb-3">
      <LocalizedLink to="/login">
        <h2 class="underline">{{ $t("auth.login.heading") }}</h2>
      </LocalizedLink>
      <LocalizedLink to="/register" class="group">
        <h2 class="text-muted hover:text-default hover:underline">{{ $t("auth.register.heading") }}</h2>
      </LocalizedLink>
    </div>
    <Error :error="authError" class="mb-5"
           data-testid="auth-error"/>
    <div class="flex flex-col gap-4">
      <FormField id="email"
                 v-model="data.email"
                 :label="$t('auth.login.email.title')"
                 :placeholder="$t('auth.login.email.placeholder')"
                 :touched="isTouched('email')"
                 :error="getFirstError('email')"
                 @blur="() => {
                   touch('email');
                   validate();
                 }"
                 class="text-lg"/>
      <FormField id="password"
                 v-model="data.password"
                 :label="$t('auth.login.password.title')" type="password"
                 :placeholder="$t('auth.login.password.placeholder')"
                 :touched="isTouched('password')"
                 :error="getFirstError('password')"
                 @blur="() => {
                   touch('password');
                   validate();
                 }"
                 class="text-lg"/>
      <div class="flex justify-between items-center">
        <Button type="submit" class="w-40 h-9 font-semibold"
                data-testid="submit" :disabled="!isValid">
          {{ $t("auth.login.action") }}
        </Button>
        <Button @click.prevent="resetAll" type="reset" class="w-30 h-9 font-semibold"
                data-testid="reset">
          {{ $t("auth.login.reset") }}
        </Button>
      </div>
    </div>
  </form>
</template>
