<script setup lang="ts">
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {asset, useValidation} from "@/shared/lib";
import {createUpdateMeSchema, type UpdateMeDto} from "../../model/update-me.schema";
import {Divider, Form, FormField} from "@/shared/ui";
import {useViewerStore} from "@/entities/viewer";
import {errorCodes, formCodes, resourceCodes} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import UploadAvatar from "@/features/settings/ui/UploadAvatar.vue";
import {codeToKey} from "@/shared/i18n";
import {useToastStore} from "@/shared/model";

const {viewer, updateMe} = useViewerStore();

const data = ref<UpdateMeDto>({
  newUsername: viewer?.username,
  newEmail: viewer?.email,
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
});

const {t} = useI18n();

const {push} = useToastStore();

const tOptions = {
  newUsername: {
    [errorCodes.MIN_LENGTH]: {
      n: 2,
      fieldName: t(codeToKey(formCodes.NEW_PASSWORD_NAME))
    }
  },
  newEmail: {
    [errorCodes.EMAIL]: {
      fieldName: t(codeToKey(formCodes.NEW_EMAIL_NAME))
    }
  },
  newPassword: {
    [errorCodes.MIN_LENGTH]: {
      n: 8,
      fieldName: t(codeToKey(formCodes.NEW_PASSWORD_NAME))
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
    push(t(codeToKey(resourceCodes.USER_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(resourceCodes.USER_UPDATE_ERROR)), "error");
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
      <div class="flex flex-col gap-10">
        <h3 class="font-semibold">
          {{ $t("settings.profile.avatar.heading") }}
        </h3>
        <div class="flex justify-between">
          <UploadAvatar :avatar-url="asset('filler/noImage.png')"
                        :avatar-size-rem="15"
                        class="w-fit"/>
        </div>

        <Divider/>

        <h3 class="font-semibold">
          {{ $t("settings.profile.user-data.heading") }}
        </h3>
        <div class="grid grid-cols-2 gap-x-15 gap-y-5">
          <FormField id="newUsername"
                     v-model="data.newUsername"
                     :label="$t(codeToKey(formCodes.NEW_USERNAME_NAME))"
                     :placeholder="$t(codeToKey(formCodes.NEW_USERNAME_PLACEHOLDER))"
                     :touched="isFieldTouched('newUsername')"
                     :error="getError('newUsername')"
                     @blur="() => {
                        touch('newUsername');
                        clientValidate();
                      }"/>

          <FormField id="newEmail"
                     v-model="data.newEmail"
                     :label="$t(codeToKey(formCodes.NEW_EMAIL_NAME))"
                     :placeholder="$t(codeToKey(formCodes.NEW_EMAIL_PLACEHOLDER))"
                     :touched="isFieldTouched('newEmail')"
                     :error="getError('newEmail')"
                     @blur="() => {
                        touch('newEmail');
                        clientValidate();
                        }"/>

          <FormField id="oldPassword"
                     v-model="data.oldPassword"
                     :label="$t(codeToKey(formCodes.OLD_PASSWORD_NAME))"
                     :placeholder="$t(codeToKey(formCodes.OLD_PASSWORD_PLACEHOLDER))"
                     :touched="isFieldTouched('oldPassword')"
                     :error="getError('oldPassword')"
                     @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>

          <FormField id="newPassword"
                     v-model="data.newPassword"
                     :label="$t(codeToKey(formCodes.NEW_PASSWORD_NAME))"
                     :placeholder="$t(codeToKey(formCodes.NEW_PASSWORD_PLACEHOLDER))"
                     :touched="isFieldTouched('newPassword')"
                     :error="getError('newPassword')"
                     @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>

          <FormField id="confirmPassword"
                     v-model="data.confirmPassword"
                     :label="$t(codeToKey(formCodes.CONFIRM_PASSWORD_NAME))"
                     :placeholder="$t(codeToKey(formCodes.CONFIRM_PASSWORD_PLACEHOLDER))"
                     :touched="isFieldTouched('confirmPassword')"
                     :error="getError('confirmPassword')"
                     @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>
        </div>
      </div>
    </template>
    <template #submit>
      {{ $t("form.actions.update") }}
    </template>
  </Form>
</template>