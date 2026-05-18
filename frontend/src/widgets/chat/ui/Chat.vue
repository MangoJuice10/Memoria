<script setup lang="ts">
import {useChatStore} from "@/shared/model";
import Message from "./Message.vue";
import ChatTextarea from "./ChatTextarea.vue";
import {storeToRefs} from "pinia";
import ChatToggle from "@/widgets/chat/ui/ChatToggle.vue";
import {Dropdown, HistoryIcon, IconButton, Resizable} from "@/shared/ui";

defineOptions({
  inheritAttrs: false,
});

const chatStore = useChatStore();
const {isVisible} = storeToRefs(chatStore);
const {toggle} = chatStore;
</script>

<template>
  <Transition name="chat" mode="out-in">
    <Resizable v-if="isVisible"
               v-bind="$attrs"
               has-left-resize-handle>
      <div class="flex flex-col items-center
                  overflow-y-auto border-l border-default
                  bg-primary">
        <div class="flex justify-between items-center
                    w-full border-b border-default">
          <ChatToggle :is-expanded="true"
                      class="bg-tertiary"
                      @click="toggle"/>
          <span class="text-2xl font-semibold">
            Chat with AI
          </span>
          <Dropdown side="bottom"
                    align="left"
                    trigger-classes="h-full"
                    class="w-1/6 h-full border-l border-default
                           bg-tertiary">
            <template #trigger>
              <IconButton :size-rem="3"
                          :has-color="false">
                <HistoryIcon/>
              </IconButton>
            </template>

            <template #menu>
              <div class="flex flex-col divide-y divide-default
                          border rounded-2xl border-default
                          text-base truncate
                          bg-tertiary">
                <span class="px-5 py-3">
                  Chat with AI #1
                </span>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="flex flex-col gap-10
                    h-full p-10 overflow-y-auto
                    text-base">
          <!--TODO-->
          <Message author="other">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci nec augue egestas gravida. Etiam
            massa
            tortor, congue sed hendrerit ut, placerat ac nisl. Praesent fermentum magna eget tortor condimentum, et
            dignissim
            est hendrerit. Vivamus auctor ut lectus eu facilisis. Donec sed neque tempor, efficitur urna nec, semper
            magna.
          </Message>
          <Message>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci nec augue egestas gravida. Etiam
            massa
            tortor, congue sed hendrerit ut, placerat ac nisl. Praesent fermentum magna eget tortor condimentum, et
            dignissim
            est hendrerit. Vivamus auctor ut lectus eu facilisis. Donec sed neque tempor, efficitur urna nec, semper
            magna.
          </Message>
          <Message author="other">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci nec augue egestas gravida. Etiam
            massa
            tortor, congue sed hendrerit ut, placerat ac nisl. Praesent fermentum magna eget tortor condimentum, et
            dignissim
            est hendrerit. Vivamus auctor ut lectus eu facilisis. Donec sed neque tempor, efficitur urna nec, semper
            magna.
          </Message>
          <Message>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci nec augue egestas gravida. Etiam
            massa
            tortor, congue sed hendrerit ut, placerat ac nisl. Praesent fermentum magna eget tortor condimentum, et
            dignissim
            est hendrerit. Vivamus auctor ut lectus eu facilisis. Donec sed neque tempor, efficitur urna nec, semper
            magna.
          </Message>
          <Message author="other">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci nec augue egestas gravida. Etiam
            massa
            tortor, congue sed hendrerit ut, placerat ac nisl. Praesent fermentum magna eget tortor condimentum, et
            dignissim
            est hendrerit. Vivamus auctor ut lectus eu facilisis. Donec sed neque tempor, efficitur urna nec, semper
            magna.
          </Message>
        </div>
        <div class="w-full p-10 border-t border-default">
          <ChatTextarea class="w-full max-h-[20vh]"/>
        </div>
      </div>
    </Resizable>
    <ChatToggle v-else
                :is-expanded="false"
                @click="toggle"/>
  </Transition>
</template>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>