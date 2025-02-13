import { ExtensionServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

let handler;

// Long-lived connection for LLM engine
chrome.runtime.onConnectExternal.addListener(function (port) {
    if (port.name === "web_llm_service_worker") {
        if (handler === undefined) {
            handler = new ExtensionServiceWorkerMLCEngineHandler(port);
        } else {
            handler.setPort(port);
        }
        port.onMessage.addListener(handler.onmessage.bind(handler));
    } else {
        port.onMessage.addListener((msg, port) => {
            if (msg === "version") {
                port.postMessage({
                    version: chrome.runtime.getManifest().version
                });
            } else if (msg === "manifest") {
                port.postMessage(chrome.runtime.getManifest());
            } else {
                console.warn(
                    `unknow message from unknown port name: ${port.name}\n message: ${JSON.stringify(msg)}`
                );
            }
        });
    }
});
