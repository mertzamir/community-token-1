const web3Reducer = (state, action) => {
  switch (action.type) {
    case "CONNECTED":
      return console.log("connected");
    case "DISCONNECTED":
      return console.log("disconnected");
    default:
      console.log("none");
  }
};
