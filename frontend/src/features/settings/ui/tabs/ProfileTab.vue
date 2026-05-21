<script setup lang="ts">
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {asset, useValidation} from "@/shared/lib";
import {createUpdateMeSchema, type UpdateMeInput} from "../../model/update-me.schema";
import {Divider, Form, FormError, FormField, UploadImage} from "@/shared/ui";
import {useViewerStore} from "@/entities/viewer";
import {allowedImageTypes, codes, MAX_USER_AVATAR_SIZE} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {codeToKey} from "@/shared/i18n";
import {createUploadImageSchema, useToastStore} from "@/shared/model";

const {t} = useI18n();
const {viewer, updateMe, uploadAvatar} = useViewerStore();
const {push} = useToastStore();

const data = ref<UpdateMeInput>({
  newUsername: viewer?.username,
  newEmail: viewer?.email,
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
});

const tOptions = {
  newUsername: {
    [codes.MIN_LENGTH]: {
      n: 2,
      fieldName: t(codeToKey(codes.NEW_PASSWORD_NAME))
    }
  },
  newEmail: {
    [codes.EMAIL]: {
      fieldName: t(codeToKey(codes.NEW_EMAIL_NAME))
    }
  },
  newPassword: {
    [codes.MIN_LENGTH]: {
      n: 8,
      fieldName: t(codeToKey(codes.NEW_PASSWORD_NAME))
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

const touchPasswordFields = () => {
  touch("oldPassword");
  touch("newPassword");
  touch("confirmPassword");
};

const avatar = ref<File | null>(null);

const avatarValidation = useValidation(avatar, createUploadImageSchema("cover", t, allowedImageTypes, MAX_USER_AVATAR_SIZE));

const isSubmitEnabled = computed(() =>
    isFormTouched() && isValid.value
    || avatarValidation.isFormTouched() && avatarValidation.isValid.value
);

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  const avatarResult = await avatarValidation.clientValidate();
  if (!avatarResult.success) return;

  try {
    await updateMe(result.data);
    push(t(codeToKey(codes.USER_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.USER_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }

  try {
    if (avatarResult.data) await uploadAvatar(avatarResult.data);
    push(t(codeToKey(codes.USER_AVATAR_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      push(t(codeToKey(codes.USER_AVATAR_UPDATE_ERROR)), "error");
      const body = error?.response?.data as ErrorResponse;
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
        <div class="flex flex-col items-center gap-5">
          <UploadImage :old-image-url="viewer?.avatarUrl"
                       :default-img-url="asset('filler/noImage.png')"
                       :img-size-rem="15"
                       imgClasses="rounded-full"
                       @img-change="(file) => {
                         avatarValidation.touch('avatar');
                         avatar = file;
                         avatarValidation.clientValidate();
                       }"/>
          <FormError :error="avatarValidation.getError('avatar')"/>
        </div>
        <Divider/>
        <h3 class="font-semibold">
          {{ $t("settings.profile.user-data.heading") }}
        </h3>
        <div class="grid grid-cols-2 gap-x-15 gap-y-5">
          <FormField id="newUsername"
                     v-model="data.newUsername"
                     :label="$t(codeToKey(codes.NEW_USERNAME_NAME))"
                     :placeholder="$t(codeToKey(codes.NEW_USERNAME_PLACEHOLDER))"
                     :touched="isFieldTouched('newUsername')"
                     :error="getError('newUsername')"
                     @blur="() => {
                        touch('newUsername');
                        clientValidate();
                      }"/>

          <FormField id="newEmail"
                     v-model="data.newEmail"
                     :label="$t(codeToKey(codes.NEW_EMAIL_NAME))"
                     :placeholder="$t(codeToKey(codes.NEW_EMAIL_PLACEHOLDER))"
                     :touched="isFieldTouched('newEmail')"
                     :error="getError('newEmail')"
                     @blur="() => {
                        touch('newEmail');
                        clientValidate();
                        }"/>

          <FormField id="oldPassword"
                     v-model="data.oldPassword"
                     :label="$t(codeToKey(codes.OLD_PASSWORD_NAME))"
                     :placeholder="$t(codeToKey(codes.OLD_PASSWORD_PLACEHOLDER))"
                     :touched="isFieldTouched('oldPassword')"
                     :error="getError('oldPassword')"
                     @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>

          <FormField id="newPassword"
                     v-model="data.newPassword"
                     :label="$t(codeToKey(codes.NEW_PASSWORD_NAME))"
                     :placeholder="$t(codeToKey(codes.NEW_PASSWORD_PLACEHOLDER))"
                     :touched="isFieldTouched('newPassword')"
                     :error="getError('newPassword')"
                     @blur="() => {
                        touchPasswordFields();
                        clientValidate();
                        }"/>

          <FormField id="confirmPassword"
                     v-model="data.confirmPassword"
                     :label="$t(codeToKey(codes.CONFIRM_PASSWORD_NAME))"
                     :placeholder="$t(codeToKey(codes.CONFIRM_PASSWORD_PLACEHOLDER))"
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