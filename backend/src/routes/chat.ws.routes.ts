// @ts-nocheck

export const createWsRoutes = (app) => {
    app.ws('/', function(ws, req) {
        ws.on('message', function(msg) {
          console.log(msg);
        });
        console.log('socket', req.testing);
    });
}
