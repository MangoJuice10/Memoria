<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {createRegisterSchema, type RegisterDto} from "@/shared/model";
import {Form, FormField, LocalizedLink} from "@/shared/ui";
import {useValidation} from "@/shared/lib";
import {useViewerStore} from "@/entities/viewer";

const viewer = useViewerStore();
const router = useRouter();
const route = useRoute();
const {t} = useI18n();

const data = ref<RegisterDto>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const {
  isValid,
  getFirstError,
  isFieldTouched,
  touch,
  touchAll,
  validate,
  reset: resetForm
} = useValidation(data, createRegisterSchema(t), {
  mode: "eager",
  delay: 300
});

const authError = ref<string | null>(null);

const submit = async () => {
  const validatedData = await validate();
  touchAll();

  if (!isValid.value) return;

  try {
    await viewer.register(validatedData);
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
  <Form :formError="authError"
        :is-submit-enabled="isValid"
        :is-reset-enabled="true"
        submit-classes="w-40 h-9 font-semibold"
        reset-classes="w-20 h-9 font-semibold"
        class="w-[35vw] p-5 border rounded-lg border-default bg-tertiary"
        data-testid="register-form"
        @submit.prevent="submit"
        @reset.prevent="resetAll">
    <template #heading>
      <div class="flex justify-center items-center gap-5 mb-3">
        <LocalizedLink name="login">
          <h2 class="text-muted hover:text-default">{{ $t("auth.login.heading") }}</h2>
        </LocalizedLink>
        <LocalizedLink name="register">
          <h2 class="underline">{{ $t("auth.register.heading") }}</h2>
        </LocalizedLink>
      </div>
    </template>

    <template #fields>
      <FormField id="username"
                 v-model="data.username"
                 :label="$t('auth.register.username.title')"
                 :placeholder="$t('auth.register.username.placeholder')"
                 :touched="isFieldTouched('username')"
                 :error="getFirstError('username')"
                 @blur="() => {
                   validate();
                   touch('username');
                 }"/>
      <FormField id="email"
                 v-model="data.email"
                 :label="$t('auth.register.email.title')"
                 :placeholder="$t('auth.register.email.placeholder')"
                 :touched="isFieldTouched('email')"
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
                 :touched="isFieldTouched('password')"
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
                 :touched="isFieldTouched('confirmPassword')"
                 :error="getFirstError('confirmPassword')"
                 @blur="() => {
                   validate();
                   touch('confirmPassword');
                 }"/>
    </template>

    <template #submit>
      {{ $t("form.actions.register") }}
    </template>
  </Form>
</template>