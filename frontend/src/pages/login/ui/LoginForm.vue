<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {createLoginSchema, type LoginDto} from "@/shared/model";
import {Form, FormField, TabLinks} from "@/shared/ui";
import {useMenu, useValidation} from "@/shared/lib";
import {useViewerStore} from "@/entities/viewer";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {AUTH_LAYOUT, codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const data = ref<LoginDto>({
  email: "",
  password: "",
});

const viewer = useViewerStore();
const route = useRoute();
const router = useRouter();
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
} = useValidation(data, createLoginSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const submit = async () => {
  touchAll();

  const validatedData = await clientValidate();
  if (!validatedData) return;

  try {
    await viewer.login(validatedData);
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
  <Form :form-error="getFormError()"
        :is-submit-enabled="isValid"
        :is-reset-enabled="true"
        form-error-classes="text-center"
        submit-classes="w-30 h-9 font-semibold"
        reset-classes="w-30 h-9 font-semibold"
        class="w-[35vw] p-5 border rounded-lg border-default
               text-base
               bg-tertiary"
        data-testid="login-form"
        @submit="submit"
        @reset="reset">
    <template #heading>
      <TabLinks :menu-item-views
                class="text-2xl"/>
    </template>

    <template #fields>
      <div class="flex flex-col gap-4">
        <FormField id="email"
                   v-model="data.email"
                   :label="$t(codeToKey(codes.EMAIL_NAME))"
                   :placeholder="$t(codeToKey(codes.EMAIL_PLACEHOLDER))"
                   :touched="isFieldTouched('email')"
                   :error="getError('email')"
                   @blur="() => {
                     touch('email');
                     clientValidate();
                   }"/>
        <FormField id="password"
                   v-model="data.password"
                   :label="$t(codeToKey(codes.PASSWORD_NAME))"
                   type="password"
                   :placeholder="$t(codeToKey(codes.PASSWORD_PLACEHOLDER))"
                   :touched="isFieldTouched('password')"
                   :error="getError('password')"
                   @blur="() => {
                     touch('password');
                     clientValidate();
                   }"/>
      </div>
    </template>

    <template #submit>
      {{ $t("form.actions.login") }}
    </template>
  </Form>
</template>
