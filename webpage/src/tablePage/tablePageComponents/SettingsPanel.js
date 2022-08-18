import React, { useState } from 'react'
import Settings from './Settings'
import DownloadJSON from '../../settings/settingsComponents/DownloadJSON'
export default function SettingsPanel({ settings, settingsHandler,tableId }) {
    const [showPanel, setShowPanel] = useState(false)
    async function handlerSettings(data) {
        var success = await settingsHandler(data)
        if (success) {
            setShowPanel(false)
        }
    }
    const panelHandler = () => {
        setShowPanel(!showPanel)
    }
    const panelDrawing = () => {
        if (showPanel) {
            return (
                <>
                    <DownloadJSON tableId={tableId}/>
                    <Settings fields={settings.fields} userFields={settings.userFields} settings={settings.settings} settingsHandler={handlerSettings} />
                    
                </>
            )
        } else {
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
