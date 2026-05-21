
<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {createRegisterSchema, type RegisterDto} from "../model/register.schema";
import {Form, FormField, TabLinks} from "@/shared/ui";
import {useMenu, useValidation} from "@/shared/lib";
import {useViewerStore} from "@/entities/viewer";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {AUTH_LAYOUT} from "@/shared/config";

const data = ref<RegisterDto>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const {register} = useViewerStore();
const router = useRouter();
const route = useRoute();
const {t} = useI18n();
const {menuItemViews} = useMenu(AUTH_LAYOUT, t);

const {
  isValid,
  getError,
  getFormError,
  isFieldTouched,
  touch,
  touchAll,
  clientValidate,
  serverValidate,
  reset
} = useValidation(data, createRegisterSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const submit = async () => {
  touchAll();
  const result = await clientValidate();
  if (!result.success) return;

  try {
    await register(result.data);
    await router.push({
      name: "home",
      params: route.params,
      query: route.query,
      hash: route.hash
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};
</script>

<template>
  <Form :formError="getFormError()"
        :is-submit-enabled="isValid"
        :is-reset-enabled="true"
        form-error-classes="text-center"
        submit-classes="w-40 h-9 font-semibold"
        reset-classes="w-20 h-9 font-semibold"
        class="w-[35vw] p-5 border rounded-lg border-default
               text-base
               bg-tertiary"
        data-testid="register-form"
        @submit="submit"
        @reset="reset">
    <template #heading>
      <TabLinks :menu-item-views
                class="text-2xl"/>
    </template>

    <template #fields>
      <FormField id="username"
                 v-model="data.username"
                 :label="$t('auth.register.username.title')"
                 :placeholder="$t('auth.register.username.placeholder')"
                 :touched="isFieldTouched('username')"
                 :error="getError('username')"
                 @blur="() => {
                   clientValidate();
                   touch('username');
                 }"/>
      <FormField id="email"
                 v-model="data.email"
                 :label="$t('auth.register.email.title')"
                 :placeholder="$t('auth.register.email.placeholder')"
                 :touched="isFieldTouched('email')"
                 :error="getError('email')"
                 @blur="() => {
                   clientValidate();
                   touch('email');
                 }"/>
      <FormField id="password"
                 v-model="data.password"
                 :label="$t('auth.register.password.title')"
                 :placeholder="$t('auth.register.password.placeholder')"
                 type="password"
                 :touched="isFieldTouched('password')"
                 :error="getError('password')"
                 @blur="() => {
                   clientValidate();
                   touch('password');
                 }"/>
      <FormField id="confirmPassword"
                 v-model="data.confirmPassword"
                 :label="$t('auth.register.confirmPassword.title')"
                 :placeholder="$t('auth.register.confirmPassword.placeholder')"
                 type="password"
                 :touched="isFieldTouched('confirmPassword')"
                 :error="getError('confirmPassword')"
                 @blur="() => {
                   clientValidate();
                   touch('confirmPassword');
                 }"/>
    </template>

    <template #submit>
      {{ $t("form.actions.register") }}
    </template>
  </Form>
</template>