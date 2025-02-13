import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { isAllCacheStoreEmpty, emptyAllCacheStores } from "./cacheUtils";
import { useAsync, useAsyncCallback } from "react-async-hook";

const logo = new URL("icons/icon-64.png", import.meta.url);

//Function to replace "magda" keywords to https://magda.io/ link in description
function linkMagdaKeywords(desc: string) {
    return {
        __html: desc.replace(
            /magda/gi,
            '<a class="magda-links" href="https://magda.io/" target="_blank">$&</a>'
        )
    };
}

const App: FunctionComponent = () => {
    const [cacheStatusRefreshToken, setCacheStatusRefreshToken] =
        useState<string>("");
    const manifest = useMemo(() => {
        return chrome.runtime.getManifest();
    }, []);

    const { result: isCacheEmpty } = useAsync(async () => {
        return await isAllCacheStoreEmpty();
    }, [cacheStatusRefreshToken]);

    const {
        execute: cacheStoreDeleteHandler,
        loading: cacheStoreDeleteLoading,
        error: cacheStoreDeleteError
    } = useAsyncCallback(async () => {
        await emptyAllCacheStores();
        setCacheStatusRefreshToken(Math.random() + "");
    });

    useEffect(() => {
        document.title = manifest.name;
    }, [manifest]);

    return (
        <>
            <button
                className="close-button"
                title="Close"
                onClick={() => window.close()}
            >
                X
            </button>
            <img className="logo" src={logo as any} alt="Extension Logo" />
            <h1 className="extension-title">{manifest.name}</h1>
            <h2 className="extension-version">Version: {manifest.version}</h2>
            {manifest?.description ? (
                <p
                    id="extension-description"
                    dangerouslySetInnerHTML={linkMagdaKeywords(
                        manifest.description
                    )}
                />
            ) : null}
            <p>
                {" "}
                Sites allowed to connect:{" "}
                {manifest?.externally_connectable?.matches?.length
                    ? manifest.externally_connectable.matches.join(", ")
                    : "None"}{" "}
            </p>
            <a
                className="homepage-link"
                href={
                    manifest?.homepage_url
                        ? manifest.homepage_url
                        : "https://magda.io/"
                }
                target="_blank"
            >
                Please visit our site for more information
            </a>
            {typeof isCacheEmpty === "boolean" && isCacheEmpty === false ? (
                <div className="delete-cache-button-container">
                    {cacheStoreDeleteLoading ? (
                        <>Deleting all local cache...</>
                    ) : null}
                    {!cacheStoreDeleteLoading && cacheStoreDeleteError
                        ? `Failed to clear cache: ${cacheStoreDeleteError}`
                        : null}
                    {!cacheStoreDeleteLoading ? (
                        <button
                            className="delete-cache-button"
                            onClick={cacheStoreDeleteHandler}
                        >
                            Delete all downloaded models
                        </button>
                    ) : null}
                </div>
            ) : null}
        </>
    );
};

export default App;
