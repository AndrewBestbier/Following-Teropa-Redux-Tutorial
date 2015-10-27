import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());

    /* This is pretty interesting. So this is called when the person in charge, or people do an action.
       The store will change it's state and then, when it is done, it will call store.subscribe() seen far above */
    socket.on('action', store.dispatch.bind(store));
  });
}
