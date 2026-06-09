<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { AdminGuard } from '@/entities/admin';
import { useRouter } from 'vue-router';
import { BackIcon, AccountIcon, TrashIcon, RefreshIcon, ArrowIcon, Searchbar, Button, IconButton, IconLabel } from '@/shared/ui';
import { Avatar } from '@/entities/user';
import { asset } from '@/shared/lib';
import { getAllUsers, deleteUser, assignRole, removeRole, type AdminUser } from '@/entities/admin/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

const router = useRouter();
const queryClient = useQueryClient();

const goBack = () => {
  router.push({ name: 'admin' });
};

// State
const searchQuery = ref('');
const roleFilter = ref('');
const currentPage = ref(1);
const limit = ref(20);

// Query
const { data, isLoading, error, refetch } = useQuery({
  queryKey: computed(() => ['admin-users', searchQuery.value, roleFilter.value, currentPage.value, limit.value]),
  queryFn: () => getAllUsers({
    search: searchQuery.value || undefined,
    role: roleFilter.value || undefined,
    page: currentPage.value,
    limit: limit.value,
  }),
});

// Computed
const users = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta);

// Reset to page 1 when search/filter changes
watch([searchQuery, roleFilter], () => {
  currentPage.value = 1;
});

// Mutations
const deleteUserMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  },
});

const assignRoleMutation = useMutation({
  mutationFn: ({ userId, roleName }: { userId: number; roleName: 'user' | 'admin' }) =>
    assignRole(userId, roleName),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  },
});

const removeRoleMutation = useMutation({
  mutationFn: ({ userId, roleName }: { userId: number; roleName: 'user' | 'admin' }) =>
    removeRole(userId, roleName),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  },
});

// Actions
const handleDeleteUser = async (user: AdminUser) => {
  if (confirm(`Вы уверены, что хотите удалить пользователя ${user.username}?`)) {
    try {
      await deleteUserMutation.mutateAsync(user.id);
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Ошибка при удалении пользователя');
    }
  }
};

const handleToggleRole = async (user: AdminUser, roleName: string) => {
  const hasRole = user.roles.some((r: any) => r.name === roleName);
  
  try {
    if (hasRole) {
      await removeRoleMutation.mutateAsync({ userId: user.id, roleName: roleName as 'user' | 'admin' });
    } else {
      await assignRoleMutation.mutateAsync({ userId: user.id, roleName: roleName as 'user' | 'admin' });
    }
  } catch (error) {
    console.error('Failed to toggle role:', error);
    alert('Ошибка при изменении роли');
  }
};

const hasRole = (user: AdminUser, roleName: string) => {
  return user.roles.some((r: any) => r.name === roleName);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const nextPage = () => {
  if (meta.value && currentPage.value < meta.value.totalPages) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <AdminGuard>
    <div class="flex flex-col min-h-screen bg-tertiary">
      <section class="px-page pt-10 pb-10 mb-8">
        <div class="rounded-3xl border border-default bg-primary shadow-xl p-10">
          <div class="flex items-start gap-5 mb-6">
            <button 
              @click="goBack"
              class="p-4 rounded-2xl border border-default hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <BackIcon class="icon-static w-7 h-7"/>
            </button>
            <div class="p-4 rounded-2xl border border-default">
              <AccountIcon class="icon-static w-14"/>
            </div>
            <div class="flex-1">
              <h1 class="text-4xl font-bold tracking-tight">Управление пользователями</h1>
              <p class="mt-2 text-lg text-muted leading-relaxed">
                Просмотр, редактирование и управление ролями пользователей
              </p>
            </div>
            <button
              @click="refetch()"
              class="p-4 rounded-2xl border border-default hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Обновить"
            >
              <RefreshIcon class="icon-static w-7 h-7"/>
            </button>
          </div>

          <!-- Filters -->
          <div class="flex gap-4 mb-6">
            <div class="flex-1">
              <Searchbar v-model="searchQuery" placeholder="Поиск по имени или email..."/>
            </div>
            <select 
              v-model="roleFilter"
              class="px-4 py-2 rounded-xl border border-default bg-tertiary text-base font-medium"
            >
              <option value="">Все роли</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl">Загрузка пользователей...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl mb-4">Ошибка при загрузке пользователей</p>
            <p class="text-base text-muted">{{ error }}</p>
          </div>

          <!-- Users Table -->
          <div v-else-if="users.length > 0" class="rounded-2xl border border-default bg-tertiary shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
              <!-- Grid-based layout -->
              <div class="min-w-[1200px]">
                <!-- Header -->
                <div class="grid grid-cols-[minmax(60px,auto)_minmax(180px,1fr)_minmax(200px,1.5fr)_minmax(160px,1fr)_minmax(120px,auto)_minmax(180px,1fr)_minmax(80px,auto)] gap-4 bg-primary border-b border-default px-6 py-5">
                  <div class="text-base font-semibold">ID</div>
                  <div class="text-base font-semibold">Пользователь</div>
                  <div class="text-base font-semibold">Email</div>
                  <div class="text-base font-semibold">Роли</div>
                  <div class="text-base font-semibold">Колоды</div>
                  <div class="text-base font-semibold">Дата регистрации</div>
                  <div class="text-base font-semibold text-center">Действия</div>
                </div>
                
                <!-- Rows -->
                <div
                  v-for="user in users"
                  :key="user.id"
                  class="grid grid-cols-[minmax(60px,auto)_minmax(180px,1fr)_minmax(200px,1.5fr)_minmax(160px,1fr)_minmax(120px,auto)_minmax(180px,1fr)_minmax(80px,auto)] gap-4 border-b border-default hover:bg-primary/50 transition-colors px-6 py-5 items-center"
                >
                  <div class="text-base font-medium">{{ user.id }}</div>
                  
                  <div class="flex items-center gap-2 min-w-0">
                    <Avatar 
                      :src="user.avatarUrl ?? asset('filler/noAvatar.png')"
                      class="w-10 h-10 flex-shrink-0"
                    />
                    <span class="font-medium text-base truncate">{{ user.username }}</span>
                  </div>
                  
                  <div class="text-base text-muted truncate">{{ user.email }}</div>
                  
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="role in ['user', 'admin']"
                      :key="role"
                      type="button"
                      @click="handleToggleRole(user, role)"
                      :class="[
                        'px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all duration-200 hover:scale-105',
                        hasRole(user, role)
                          ? 'bg-secondary text-inverse border-secondary shadow-md shadow-secondary/30'
                          : 'border-default bg-primary hover:bg-hover hover:shadow-sm'
                      ]"
                    >
                      {{ role }}
                    </button>
                  </div>
                  
                  <div class="text-base whitespace-nowrap">
                    {{ user._count.decks }} / {{ user._count.educationalResources }} ресурсов
                  </div>
                  
                  <div class="text-base text-muted">{{ formatDate(user.createdAt) }}</div>
                  
                  <div class="flex items-center justify-center">
                    <IconButton 
                      :size-rem="2.3"
                      color-hover-primary="var(--color-primary)"
                      color-active-primary="var(--color-primary)"
                      color-hover-secondary="var(--color-surface-danger)"
                      color-active-secondary="var(--color-surface-danger)"
                      :scale-hover="1.15"
                      :scale-active="1.2"
                      @click="handleDeleteUser(user)"
                    >
                      <TrashIcon/>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="meta" class="px-6 py-5 bg-primary border-t border-default flex items-center justify-between">
              <div class="text-base text-muted font-medium">
                Показано {{ (meta.page - 1) * meta.limit + 1 }}-{{ Math.min(meta.page * meta.limit, meta.total) }} из {{ meta.total }}
              </div>
              <div class="flex gap-3 items-center">
                <Button
                  @click="prevPage"
                  :enabled="currentPage > 1"
                  class="px-4 py-2.5"
                  :is3D="false"
                >
                  <ArrowIcon class="icon-static-inverse w-6 h-6 rotate-180"/>
                </Button>
                <div class="px-5 py-2.5 text-base font-semibold flex items-center">
                  Страница {{ meta.page }} из {{ meta.totalPages }}
                </div>
                <Button
                  @click="nextPage"
                  :enabled="currentPage < meta.totalPages"
                  class="px-4 py-2.5"
                  :is3D="false"
                >
                  <ArrowIcon class="icon-static-inverse w-6 h-6"/>
                </Button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl">Пользователи не найдены</p>
          </div>
        </div>
      </section>
    </div>
  </AdminGuard>
</template>
