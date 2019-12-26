export const config = {
   HOST : "http://45.55.144.89/fsapi",
   //HOST_CLUB : "http://45.55.144.89/yooloclubapi",
   ENDPOINT_SOCKETIO_CHAT_PORT: 'http://45.55.144.89:7791/chat',

  //HOST : "http://localhost:7790/fsapi",
   HOST_CLUB : "http://localhost:7790/yooloclubapi",
  //ENDPOINT_SOCKETIO_CHAT_PORT: 'http://localhost:7791',

    //AMAZON
   //HOST : "http://52.91.139.190/fsapi",
   //ENDPOINT_SOCKETIO_CHAT_PORT: 'http://52.91.139.190:7791',

    //HOST : "http://10.42.0.18:3000",
    //HOST : "http://192.168.15.3:7790/fsapi",
    //HOST : "http://52.91.139.190/fsapi",
   // HOST: 'http://45.55.144.89:3000',
   // ENDPOINT_SOCKETIO_CHAT_PORT: 'http://45.55.144.89:7791',
    JWT_TOKEN_NAME: 'token',
    EMAIL_REGEXP : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // Passwords should be at least 8 characters long and should contain one number, one character and one special character.
    PASSWORD_REGEXP : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
}
