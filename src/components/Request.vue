<template>
    <div class="request">
        <input v-model="userInput" :disabled="loading" @keyup.enter="sendMessage" placeholder="说点什么吧。。。">
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/types';
import { ref } from 'vue'

const emit = defineEmits<{
    (e:'send-message', message: ChatMessage): void
}>()

const userInput = ref('')
const loading = ref(false)

async function sendMessage() {
    if (!userInput.value || loading.value) return

    let message: ChatMessage = {
        role: 'user',
        content: userInput.value
    }
    emit('send-message', message)

    loading.value = true
    const response: string = await sendRequest()

    message = {
        role: 'bot',
        content: response
    }
    emit('send-message', message)

    userInput.value = ''
    loading.value = false
}

async function sendRequest(history?: ChatMessage[]) {
    const url = 'http://localhost:8000/chat'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: [
                {
                    role: 'user',
                    parts: userInput.value
                }
            ]
        })
    })

    const data = await response.json()
    return data
}
</script>

<style scoped></style>