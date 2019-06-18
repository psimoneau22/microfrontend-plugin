import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import fetchPluginManifest from './fetchPluginManifest';

export default function DynamicPlugin({ id: pluginId }) {
    const targetElement = useRef();

    useEffect(() => {
        if(pluginId) {
            renderPlugin(pluginId);
        }

        return destroyPlugin;
    }, [pluginId])

    function renderPlugin(pluginId) {
        fetchPluginManifest(pluginId)
            .then(plugin => {

                if(!plugin) {
                    return;
                };

                const existing = document.querySelector(`script[data-plugin-id="${plugin.id}"]`);
                if(existing) {
                    return;
                };

                const script = document.createElement('script');
                script.setAttribute('src', plugin.uri)
                script.onload = function() {
                    const { Root: PluginRoot } = window[pluginId];
                    ReactDOM.render(<PluginRoot />, targetElement.current);
                }

                document.body.appendChild(script);
            });
    }

    function destroyPlugin() {
        ReactDOM.unmountComponentAtNode(targetElement.current);
    }

    return (
        <div ref={targetElement} />
    )
}