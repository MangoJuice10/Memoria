<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {createLoginSchema, type LoginDto} from "@/shared/model";
import {Form, FormField, LocalizedLink} from "@/shared/ui";
import {useValidation} from "@/shared/lib";
import {useViewerStore} from "@/entities/viewer";

const viewer = useViewerStore();
const route = useRoute();
const router = useRouter();
const {t} = useI18n();

const data = ref<LoginDto>({
  email: "",
  password: "",
});

const {
  isValid,
  getFirstError,
  isFieldTouched,
  touch,
  touchAll,
  validate,
  reset: resetForm
} = useValidation(data, createLoginSchema(t), {
  mode: "eager",
  delay: 300
});

const authError = ref<string | null>(null);

const submit = async () => {
  const validatedData = await validate();
  touchAll();

  if (!isValid.value) return;

  try {
    await viewer.login(validatedData);
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
  <Form :form-error="authError"
        :is-submit-enabled="isValid"
        :is-reset-enabled="true"
        submit-classes="w-40 h-9 font-semibold"
        reset-classes="w-30 h-9 font-semibold"
        class="w-[35vw] p-5 border rounded-lg border-default bg-tertiary"
        data-testid="login-form"
        @submit="submit"
        @reset="resetAll">
    <template #heading>
      <div class="flex justify-center items-center gap-5 mb-3">
        <LocalizedLink name="login">
          <h2 class="underline">{{ $t("auth.login.heading") }}</h2>
        </LocalizedLink>
        <LocalizedLink name="register" class="group">
          <h2 class="text-muted hover:text-default hover:underline">{{ $t("auth.register.heading") }}</h2>
        </LocalizedLink>
      </div>
    </template>

    <template #fields>
      <div class="flex flex-col gap-4">
        <FormField id="email"
                   v-model="data.email"
                   :label="$t('auth.login.email.title')"
                   :placeholder="$t('auth.login.email.placeholder')"
                   :touched="isFieldTouched('email')"
                   :error="getFirstError('email')"
                   @blur="() => {
                     touch('email');
                     validate();
                   }"
                   class="text-lg"/>
        <FormField id="password"
                   v-model="data.password"
                   :label="$t('auth.login.password.title')"
                   type="password"
                   :placeholder="$t('auth.login.password.placeholder')"
                   :touched="isFieldTouched('password')"
                   :error="getFirstError('password')"
                   @blur="() => {
                     touch('password');
                     validate();
                   }"
                   class="text-lg"/>
      </div>
    </template>

    <template #submit>
      {{ $t("form.actions.submit") }}
    </template>
  </Form>
</template>
