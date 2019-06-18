import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { fetchPluginManifest } from './proxy';

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

                const render = () => {
                    const { Root: PluginRoot } = window[pluginId];
                    ReactDOM.render(<PluginRoot />, targetElement.current);
                }

                const existing = document.querySelector(`script[data-plugin-id="${plugin.id}"]`);
                if(existing) {
                    return render();
                };

                const script = document.createElement('script');
                script.setAttribute('src', plugin.uri);
                script.setAttribute('data-plugin-id', plugin.id);
                script.onload = render;

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