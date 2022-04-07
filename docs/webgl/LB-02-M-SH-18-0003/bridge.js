function receiveMessageFromUnity(urlData) {

   console.log("Dara From Unity:" + urlData);

   // window.open(urlData, "_self");

}

function sendMessageToUnity(message) {
   unityGameInstance.SendMessage("[Bridge]", "ReceiveMessageFromPage", message);
}
