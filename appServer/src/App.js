import React, { useState, useEffect, useRef } from 'react';
import { fetchPluginMetadata } from './proxy';
//import Plugin from './DynamicPlugin';
import Plugin from './DynamicPluginConnected';

export default function App() {
    const [pluginId, setPluginId] = useState();
    const [availablePlugins, setAvailablePlugins] = useState();
    const input = useRef();
    useEffect(() => {
        fetchPluginMetadata().then(pluginMetaData => {
            setAvailablePlugins(pluginMetaData);
        })
    }, [])

    function handleUpdate() {
        setPluginId(input.current.value);
    }

    return (
        <>
            <div>Enter in a dynamic pluginId:</div>
            <pre>{JSON.stringify(availablePlugins, null, 4)}</pre>
            <input ref={input} onKeyUp={handleUpdate} />
            <Plugin id={pluginId} />
        </>
    )
}