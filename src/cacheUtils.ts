const localCacheStoreNames = ["webllm/config", "webllm/wasm", "webllm/model"];

export async function isCacheStoreEmpty(name: string) {
    const cache = await window.caches.open(name);
    const result = await cache.keys();
    return !(result.length > 0);
}

export async function isAllCacheStoreEmpty() {
    const result = await Promise.all(
        localCacheStoreNames.map(isCacheStoreEmpty)
    );
    return result.indexOf(false) === -1;
}

export async function emptyCacheStore(name: string) {
    return await window.caches.delete(name);
}

export async function emptyAllCacheStores() {
    return await Promise.all(localCacheStoreNames.map(emptyCacheStore));
}
