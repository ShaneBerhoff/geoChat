const socketOptions = {
  pingTimeout: 5000, // How long to wait for a ping response before considering connection lost
  pingInterval: 60000, // How often to send ping to check connection
  maxHttpBufferSize: 1e4, // Limits message size to 10KB - prevents memory issues
};

module.exports = socketOptions;
