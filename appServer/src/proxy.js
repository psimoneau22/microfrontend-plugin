const pluginRegistryUri = "http://localhost:5001/pluginRegistration.json";

export function fetchPluginMetadata() {
    return fetch(pluginRegistryUri)
        .then(response => response.json())
}

export function fetchPluginManifest(pluginId) {
    return fetchPluginMetadata()
        .then(pluginRegistry => {
            return pluginRegistry[pluginId];
        })
}