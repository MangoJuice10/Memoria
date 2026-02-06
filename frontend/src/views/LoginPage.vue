<script setup lang="ts">
import LoginForm from "@/components/auth/login/LoginForm.vue";
import Navbar from "@/components/navbar/Navbar.vue";
</script>

<template>
  <div>
    <Navbar/>
    <div class="flex justify-center items-center min-h-screen">
      <LoginForm>
      </LoginForm>
    </div>
  </div>
</template>