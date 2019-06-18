import React, { useState, useRef } from 'react';
import { pluginRegistry } from './fetchPluginManifest';
//import Plugin from './DynamicPlugin';
import Plugin from './DynamicPluginConnected';

export default function App() {
    const [pluginId, setPluginId] = useState();
    const input = useRef();

    function handleUpdate() {
        setPluginId(input.current.value);
    }

    return (
        <div>
            <div>Enter in a dynamic pluginId:</div>
            <pre>{JSON.stringify(pluginRegistry, null, 4)}</pre>
            <input ref={input} onKeyUp={handleUpdate} />
            <Plugin id={pluginId} />
        </div>
    )
}