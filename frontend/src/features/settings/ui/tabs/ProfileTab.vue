<script setup lang="ts">
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {createUpdateMeSchema, type UpdateMeDto} from "@/shared/model";
import {Form, FormField} from "@/shared/ui";
import {useViewerStore} from "@/entities/viewer";
import {FormFields, type UserInputErrorCode} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import type {ErrorResponse} from "@/shared/api";
import axios from "axios";

const {t} = useI18n();

const {viewer, updateMe} = useViewerStore();

const data = ref<UpdateMeDto>({
  newUsername: viewer?.username,
  newEmail: viewer?.email,
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
});

const {
  isValid,
  getFirstError,
  isFieldTouched,
  isFormTouched,
  touch,
  touchAll,
  validate,
  reset
} = useValidation(data, createUpdateMeSchema(t), {
  mode: "eager",
  delay: 300
});

const serverErrors = ref(new Map<string, UserInputErrorCode>());

const isSubmitEnabled = computed(() => isFormTouched() && isValid.value);

const touchPasswordFields = () => {
  touch("oldPassword");
  touch("newPassword");
  touch("confirmPassword");
};

const submit = async () => {
  const validatedData = await validate();
  if (!validatedData) return;
  try {
    await updateMe(validatedData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      if (body.statusCode === 409 || body.statusCode === 422) {
        for (const {path, code} of body.error.details) {
          serverErrors.value.set(path, code);
        }
      }
    }
  }
  touchAll();
};

const getError = (path: string) => {
  const clientError = getFirstError(path);
  if (clientError) return clientError;

  const serverErrorCode = serverErrors.value.get(path);
  if (serverErrorCode) return t(codeToKey(serverErrorCode));
};
</script>

<template>
  <Form
      form-error=""
      :is-submit-enabled="isSubmitEnabled"
      :is-reset-enabled="true"
      submit-classes=""
      reset-classes=""
      @submit="submit"
      @reset="reset">
    <template #heading-content>
      {{ $t("settings.navigation-links.profile") }}
    </template>

    <template #fields>
      <FormField id="username"
                 v-model="data.newUsername"
                 :label="$t(FormFields.newUsername.title)"
                 :placeholder="$t(FormFields.newUsername.placeholder)"
                 :touched="isFieldTouched('newUsername')"
                 :error="getFirstError('newUsername')"
                 @blur="() => {
                        touch('newUsername');
                        validate();
                      }"/>
      <FormField id="email"
                 v-model="data.newEmail"
                 :label="$t(FormFields.newEmail.title)"
                 :placeholder="$t(FormFields.newEmail.placeholder)"
                 :touched="isFieldTouched('newEmail')"
                 :error="getError('newEmail')"
                 @blur="() => {
                        touch('newEmail');
                        validate();
                        }"/>

      <FormField id="oldPassword"
                 v-model="data.oldPassword"
                 :label="$t(FormFields.oldPassword.title)"
                 :placeholder="$t(FormFields.oldPassword.placeholder)"
                 :touched="isFieldTouched('oldPassword')"
                 :error="getFirstError('oldPassword')"
                 @blur="() => {
                        touchPasswordFields();
                        validate();
                        }"/>

      <FormField id="newPassword"
                 v-model="data.newPassword"
                 :label="$t(FormFields.newPassword.title)"
                 :placeholder="$t(FormFields.newPassword.placeholder)"
                 :touched="isFieldTouched('newPassword')"
                 :error="getFirstError('newPassword')"
                 @blur="() => {
                        touchPasswordFields();
                        validate();
                        }"/>

      <FormField id="confirmPassword"
                 v-model="data.confirmPassword"
                 :label="$t(FormFields.confirmPassword.title)"
                 :placeholder="$t(FormFields.confirmPassword.placeholder)"
                 :touched="isFieldTouched('confirmPassword')"
                 :error="getFirstError('confirmPassword')"
                 @blur="() => {
                        touchPasswordFields();
                        validate();
                        }"/>
    </template>
  </Form>
</template>