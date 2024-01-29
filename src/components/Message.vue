<template>
    <div class="message" :class="message.role">
        <p v-show="message.role==='user'">You: </p>
        <p v-show="message.role==='bot'">Bot: </p>
        {{ message.content }}
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/types';

defineProps<{
    message: ChatMessage
}>()
</script>

<style scoped>
.message {
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    font-size: 14px;
    line-height: 1.5;
}

.message.user {
    background-color: #73a8f2;
}

.message.bot {
    background-color: #f485e5;
}
</style>