# magda-llm-service-worker-extension

A Google Chrome extension runs LLM in extension background service worker to support [Magda](https://github.com/magda-io/magda) web application frontend chatbot.

Thanks to [MLC LLM](https://llm.mlc.ai/) & [WebLLM](https://webllm.mlc.ai/) project. By leveraging [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API), this extension can assist web applications to run the LLM engine within the web browser. 

Under the web application frontend code's requests, the extension will download the requested LLM model (around 2GB download depending on models), cache locally and run it in an extension background service worker. This service worker will only remain "active" when any web pages that require it remain active.


### How to install

The extension has not been published to [Google Chrome Web Store](https://chromewebstore.google.com/) yet.

To install, you need to follow the manual steps below:
- 1> Download a release version from the [Releases page](https://github.com/magda-io/magda-llm-service-worker-extension/releases) of this repo. e.g. `magda-llm-service-worker-extension-v1.0.0.zip
`
- 2> Unzip the downloaded zip file
- 3> Open the URL `chrome://extensions` in a Chrome tab to open the Chrome extension management UI.
- 4> Tick the "Developer mode" toggle in the top-right corner.

![developer-mode-button](<./docs/developer-mode-button.png>)

- 5> Click the "Load unpacked" button in the top-left corner and select the previously downloaded & unzipped folder.

![load-unpacked-button](<./docs/load-unpacked-button.png>)

> If you want to restrict the LLM model access to specified domain, please modify the `manifest.json` in the unzippped folder after step 2 above. Modify the `externally_connectable.matches` array to set its value to your preferred domain. e.g. `"matches": ["https://*.mydomain.com/*"]`. More see [here](https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable#manifest).


### How to build

- Install [Node.js](https://nodejs.org/en/download/package-manager) & [yarn](https://yarnpkg.com/getting-started/install)
- Run `yarn install` at the project root
- Run `yarn build` to build. You can find built files in `dist` folder.

### Why need an extension

[WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) can be accessed from web pages directly without the help of extensions. However, in Google Chrome, when the setting "Clear cookies and site data when you close all windows" is selected, there is only around 300MB of local storage available, which is not sufficient to store a 7B LLM model locally. Moreover, on organisation-managed devices (e.g. company laptops), this setting often is turned on and can be changed by the user. More see [this issue](https://github.com/mlc-ai/web-llm/issues/374).

As we can request [unlimitedStorage](https://developer.chrome.com/docs/extensions/develop/concepts/storage-and-cookies) permission via this extension, the LLM model can always be downloaded locally without requiring users to change any browser settings.

### Permissions Request

When install this extension, it will request the following permissions:
- "unlimitedStorage": be able to save the LLM model locally so that we don't need to re-download it after the web page is closed.
  - The cached local data will be removed when you remove this extension from Google Chrome.
- [externally_connectable](https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable): Allow web application to connect to the extension background service worker from a web page via [Long-lived connections](https://developer.chrome.com/docs/extensions/develop/concepts/messaging#connect).
  - By default, the extension's manifest.json allows connections from any domain. You can modify the manifest.json to restrict access for your own project. More see "How to install" section.

### Support LLM Models

Please find the list here: https://mlc.ai/models