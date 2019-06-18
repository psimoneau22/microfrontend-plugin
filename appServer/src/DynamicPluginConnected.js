import React, { useState, useEffect } from 'react';
import { fetchPluginManifest } from './proxy';

export default function DynamicPluginConnected({ id }) {
    const [Plugin, setPlugin] = useState(null);

    useEffect(() => {
        renderPlugin(id)
    }, [id])

    function renderPlugin(id) {
        fetchPluginManifest(id)
            .then(plugin => {

                if(!plugin) {
                    setPlugin(null);
                    return;
                };

                const existing = document.querySelector(`script[data-plugin-id="${plugin.id}"]`);
                if(existing) {
                    setPlugin(window[plugin.id]);
                    return;
                };

                const script = document.createElement('script');
                script.setAttribute('src', plugin.uri)
                script.setAttribute('data-plugin-id', plugin.id)
                script.onload = function() {
                    setPlugin(window[plugin.id]);
                }

                document.body.appendChild(script);
            });
    }

    if(!Plugin) return null;

    return (
        <Plugin.Root />
    )
}