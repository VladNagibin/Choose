import React, { useState } from 'react'
import Settings from './Settings'
export default function SettingsPanel({ settings, settingsHandler }) {
    const [showPanel, setShowPanel] = useState(false)

    const panelHandler = () => {
        setShowPanel(!showPanel)
    }
    const panelDrawing = () => {
        if (showPanel) {
            return (
                <Settings fields={settings.fields} userFields={settings.userFields} settings={settings.settings} settingsHandler={settingsHandler} />
            )
        }else{
            return <></>
        }
    }
    return (
        <div>
            <span onClick={panelHandler} className="material-symbols-outlined material-icons">
                settings
            </span>
            {panelDrawing()}
        </div>
    )
}
