// simulate hosted registry json
export const pluginRegistry = {
    "com.blackdiamond.comp1": {
        "id": "com.blackdiamond.comp1",
        "uri": "http://localhost:5000/dist/plugins/com.blackdiamond.comp1.bundle.js",
    },
    "com.blackdiamond.comp2": {
        "id": "com.blackdiamond.comp2",
        "uri": "http://localhost:5000/dist/plugins/com.blackdiamond.comp2.bundle.js",
    }
};

export default function fetchPluginManifest(pluginId) {
    const { [pluginId]: pluginManifest } = pluginRegistry;

    return Promise.resolve(pluginManifest);
}