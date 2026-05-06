<script setup lang="ts">
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {createUpdateMeSchema, type UpdateMeDto} from "@/shared/model";
import {Form, FormField} from "@/shared/ui";
import {useViewerStore} from "@/entities/viewer";
import {domainErrorCodes, FormFields, userInputErrorCodes} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";

const {t} = useI18n();

const {viewer, updateMe} = useViewerStore();

const data = ref<UpdateMeDto>({
  newUsername: viewer?.username,
  newEmail: viewer?.email,
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
});

const tOptions = {
  formError: {
    [domainErrorCodes.NOT_FOUND_ERROR.name]: {
      resourceName: "User"
    }
  },
  newUsername: {
    [userInputErrorCodes.MIN_LENGTH]: {
      n: 2,
      fieldName: t(FormFields.NEW_USERNAME.title)
    }
  },
  newEmail: {
    [userInputErrorCodes.EMAIL]: {
      fieldName: t(FormFields.NEW_EMAIL.title)
    }
  },
  newPassword: {
    [userInputErrorCodes.MIN_LENGTH]: {
      n: 8,
      fieldName: t(FormFields.NEW_PASSWORD.title)
    }
  }
};

const {
  isValid,
  getError,
  getFormError,
  isFieldTouched,
  isFormTouched,
  touch,
  touchAll,
  clientValidate,
  serverValidate,
  reset
} = useValidation(data, createUpdateMeSchema(t), {
  mode: "eager",
  delay: 300,
  t,
  tOptions
});

const isSubmitEnabled = computed(() => isFormTouched() && isValid.value);

const touchPasswordFields = () => {
  touch("oldPassword");
  touch("newPassword");
  touch("confirmPassword");
};

const submit = async () => {
  touchAll();

  const validatedData = await clientValidate();
  if (!validatedData) return;

  try {
    await updateMe(validatedData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};
</script>

<template>
  <Form
      :form-error="getFormError()"
      :is-submit-enabled="isSubmitEnabled"
      :is-reset-enabled="true"
      @submit="submit"
      @reset="reset">
    <template #heading-content>
      {{ $t("settings.navigation-links.profile") }}
    </template>

    <template #fields>
      <FormField id="username"
                 v-model="data.newUsername"
                 :label="$t(FormFields.NEW_USERNAME.title)"
                 :placeholder="$t(FormFields.NEW_USERNAME.placeholder)"
                 :touched="isFieldTouched('newUsername')"
                 :error="getError('newUsername')"
                 @blur="() => {
                        touch('newUsername');
                        clientValidate();
                      }"/>
      <FormField id="email"
                 v-model="data.newEmail"
                 :label="$t(FormFields.NEW_EMAIL.title)"
                 :placeholder="$t(FormFields.NEW_EMAIL.placeholder)"
                 :touched="isFieldTouched('newEmail')"
                 :error="getError('newEmail')"
                 @blur="() => {
                        touch('newEmail');
                        clientValidate();
                        }"/>

      <FormField id="oldPassword"
                 v-model="data.oldPassword"
                 :label="$t(FormFields.OLD_PASSWORD.title)"
                 :placeholder="$t(FormFields.OLD_PASSWORD.placeholder)"
                 :touched="isFieldTouched('oldPassword')"
                 :error="getError('oldPassword')"
                 @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>

      <FormField id="newPassword"
                 v-model="data.newPassword"
                 :label="$t(FormFields.NEW_PASSWORD.title)"
                 :placeholder="$t(FormFields.NEW_PASSWORD.placeholder)"
                 :touched="isFieldTouched('newPassword')"
                 :error="getError('newPassword')"
                 @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>

      <FormField id="confirmPassword"
                 v-model="data.confirmPassword"
                 :label="$t(FormFields.CONFIRM_PASSWORD.title)"
                 :placeholder="$t(FormFields.CONFIRM_PASSWORD.placeholder)"
                 :touched="isFieldTouched('confirmPassword')"
                 :error="getError('confirmPassword')"
                 @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>
    </template>
  </Form>
</template>