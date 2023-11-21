// @ts-nocheck

import express from 'express'

const router = express.Router()

router.ws('/message/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg)
  });
});

export default router
