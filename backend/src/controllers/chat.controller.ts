// @ts-nocheck

const connections = new Map()

export const chatSignalingController = async (ws, req) => {
    const route = req.path
    connections.set(route, ws)

    ws.on('message', message => {
      message = JSON.parse(message)
      const receiver_id = message['receiver_id'];
      const data = message.data
      let receiver_connection = connections.get(`/signaling/${receiver_id}/.websocket`)
      receiver_connection.send(JSON.stringify(data))
    })

}
