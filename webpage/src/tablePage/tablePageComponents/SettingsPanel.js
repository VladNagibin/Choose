import React, { useState } from 'react'
import Settings from './Settings'
import DownloadJSON from '../../settings/settingsComponents/DownloadJSON'
import styled, { keyframes } from 'styled-components';
import { slideInRight } from 'react-animations';

const openAnimation = keyframes`${slideInRight}`;
 
const OpenDiv = styled.div`
  animation: 0.5s ${openAnimation};
`;


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
                <OpenDiv className='opened-settings'>
                    <DownloadJSON tableId={tableId}/>
                    <Settings fields={settings.fields} userFields={settings.userFields} settings={settings.settings} settingsHandler={handlerSettings} />
                </OpenDiv>
            )
        } else {
            return <></>
        }
    }
    return (
        <div className='settings settings-panel'>
            <span onClick={panelHandler} className="material-symbols-outlined material-icons">
                settings
            </span>
            {panelDrawing()}
        </div>
    )
}
