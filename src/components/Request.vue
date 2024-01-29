<template>
    <div class="request">
        <input v-model="userInput" placeholder="说点什么吧。。。" @keyup.enter="sendMessage">
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/types';
import { ref } from 'vue'

const emit = defineEmits(['send-message'])

const userInput = ref('')

async function sendMessage() {
    if (!userInput.value) return

    let message: ChatMessage = {
        role: 'user',
        content: userInput.value
    }
    emit('send-message', message)

    const response: string = await sendRequest()

    message = {
        role: 'bot',
        content: response
    }
    emit('send-message', message)

    userInput.value = '' 
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