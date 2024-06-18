import { ExtensionServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

let handler;

// Long-lived connection for LLM engine
chrome.runtime.onConnectExternal.addListener(function (port) {
    if (port.name !== "web_llm_service_worker") {
        console.warn("New connection from unknown port name: " + port.name);
        return;
    }
    if (handler === undefined) {
        handler = new ExtensionServiceWorkerMLCEngineHandler(port);
    } else {
        handler.setPort(port);
    }
    port.onMessage.addListener(handler.onmessage.bind(handler));
});

// One-time requests interface for other functionalities of the extension.
// e.g. get extension version, etc.
chrome.runtime.onMessageExternal.addListener(
    function (msg, sender, sendResponse) {
        if (msg === "version") {
            sendResponse({ version: chrome.runtime.getManifest().version });
        } else if (msg === "manifest") {
            sendResponse(chrome.runtime.getManifest());
        }
    }
);
