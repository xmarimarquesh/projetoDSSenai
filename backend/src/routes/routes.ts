import { Express } from 'express';
import express from 'express'
import user from './user.ts'
import chat from './chat.ts'

export default function (app: Express) {
    app
    .use(express.json())
    .use('/user', user)
    .use('/chat', chat)
}