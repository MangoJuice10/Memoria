<script setup lang="ts">
import {ref, computed} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import {useFormField} from "@/composables/useFormField";
import {rules} from "@/utils/rules";
import type {Rule} from "@/types/Rule";
import Error from "@/components/utils/Error.vue";
import FormHeader from "@/components/form/FormHeader.vue";
import FormInput from "@/components/form/FormInput.vue";
import Button from "@/components/form/Button.vue";

const router = useRouter();
const {t} = useI18n();
const auth = useAuthStore();

// Generic type Rule allows to create a homogenous array of rules
const emailRules: Rule<string>[] = [
  rules.required(t("validation.rules.required", {fieldName: t("validation.fields.email")})),
  rules.email(t("validation.rules.email"))
];

const passwordRules: Rule<string>[] = [
  rules.required(t("validation.rules.required", {fieldName: t("validation.fields.password")})),
  rules.minLength(8, t("validation.rules.minLength", {fieldName: t("validation.fields.password"), minLength: 8})),
];

// Rest properties destructuring is done to make use of Vue unwrapping in <template/>
const {value: emailValue, ...email} = useFormField<string>("", emailRules);
const {value: passwordValue, ...password} = useFormField<string>("", passwordRules);

const isFormValid = computed(() => {
  return email.error.value === null && password.error.value === null;
});
const validateForm = () => {
  /*
  Caching results of the method calls is preferred over
  calling the methods directly with short-circuiting && operator,
  as the latter may terminate early, resulting in not all fields
  validating, and not all validation errors displaying
   */
  const isEmailValid = email.validateNow();
  const isPasswordValid = password.validateNow();
  return isEmailValid && isPasswordValid;
};

const loading = ref(false);
const authError = ref<string | null>(null);

const submit = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    await auth.login(emailValue.value, passwordValue.value);
    authError.value = null;
    await router.push("/");
  } catch (err) {
    authError.value = t("auth.login.errors.failure");
  } finally {
    loading.value = false;
  }
};

const reset = () => {
  email.reset();
  password.reset();
  authError.value = null;
};
</script>

<template>
  <form @submit.prevent="submit"
        class="flex flex-col justify-start gap-8 w-[35vw] p-5 border rounded-lg border-border bg-tertiary"
        data-testid="login-form">
    <div class="flex flex-col items-center gap-3">
      <FormHeader :header="t('auth.login.header')"/>
      <Error :error="authError" class="text-lg"
             data-testid="auth-error"/>
    </div>
    <div class="flex flex-col justify-start items-start gap-3.75 w-full">
      <FormInput v-model="emailValue" id="email" :label="t('auth.login.email.title')"
                 :placeholder="t('auth.login.email.placeholder')" :error="email.error.value"
                 :touched="email.touched.value"
                 @input="email.validateDebounced"
                 @blur="() => {
                   email.touch();
                   email.validateNow();
                 }"
                 class="text-lg"/>
      <FormInput v-model="passwordValue" id="password" :label="t('auth.login.password.title')" type="password"
                 :placeholder="t('auth.login.password.placeholder')" :error="password.error.value"
                 :touched="password.touched.value"
                 @input="password.validateDebounced"
                 @blur="() => {
                   password.touch();
                   password.validateNow();
                 }"
                 class="text-lg"/>
    </div>
    <div class="flex justify-between items-center">
      <Button type="submit" class="w-40 h-9 font-semibold" :disabled="!isFormValid || loading"
              data-testid="submit">
        {{ $t("auth.login.action") }}
      </Button>
      <Button @click.prevent="reset" type="reset" class="w-20 h-9 font-semibold"
              data-testid="reset">
        {{ $t("auth.login.reset") }}
      </Button>
    </div>
  </form>
</template>