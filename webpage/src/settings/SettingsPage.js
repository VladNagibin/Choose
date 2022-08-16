import React, { useEffect, useState } from 'react'
import ChangeSettings from './settingsComponents/ChangeSettings'
import DownloadJSON from './settingsComponents/DownloadJSON'
import SetNewJSON from './settingsComponents/SetNewJSON'

export default function SettingsPage() {

  return (
    <div className='settings'>
      <DownloadJSON />
      <ChangeSettings />
    </div>
  )
}
