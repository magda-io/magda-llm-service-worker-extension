// Function to link "magda" keywords to https://magda.io/
function linkMagdaKeywords(element) {
    if (element) {
        element.innerHTML = element.innerHTML.replace(
            /magda/gi,
            '<a class="magda-links" href="https://magda.io/" target="_blank">$&</a>'
        );
    }
}

(async () => {
    try {
        // const res = await fetch(chrome.runtime.getURL("manifest.json"));
        // if (!res.ok) {
        //     throw new Error(
        //         `Failed to fetch manifest.json: ${res.status} ${res.statusText}`
        //     );
        // }
        const manifest = chrome.runtime.getManifest();
        document.title = manifest.name;
        if (document.getElementById("extension-title")?.innerText) {
            document.getElementById("extension-title")!.innerText =
                manifest.name;
        }
        if (document.getElementById("extension-version")?.innerText) {
            document.getElementById("extension-version")!.innerText =
                "Version: " + manifest.version;
        }
        const descElm = document.getElementById("extension-description");
        if (descElm && !manifest.description) {
            document.getElementById("extension-description")!.style.display =
                "none";
        }
        if (descElm && manifest.description) {
            document.getElementById("extension-description")!.innerText =
                manifest.description;
        }
        // Set the homepage link
        const homepageLink = document.getElementById(
            "homepage-link"
        ) as HTMLAnchorElement;
        if (homepageLink) {
            if (manifest.homepage_url) {
                homepageLink!.href = manifest.homepage_url;
                homepageLink!.style.display = "block";
            } else {
                homepageLink!.href = "https://magda.io/";
                homepageLink!.style.display = "block";
            }
        }
        // Apply the function to elements containing text
        linkMagdaKeywords(document.getElementById("extension-description"));
    } catch (e) {
        console.error("Failed to fetch & render extension manifest: " + e);
    }
})();

if (document.getElementById("close-button")) {
    document.getElementById("close-button")!.addEventListener("click", () => {
        window.close(); // Attempt to close the popup window
    });
}
