function receiveMessageFromUnity(urlData) {

   window.open(urlData, "_self");

}

function sendMessageToUnity(message) {
   unityGameInstance.SendMessage("[Bridge]", "ReceiveMessageFromPage", message);
}
