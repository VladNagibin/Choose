import React, { useEffect, useState } from 'react'
import DownloadJSON from './settingsComponents/DownloadJSON'
import SetNewJSON from './settingsComponents/SetNewJSON'

export default function SettingsPage() {

  return (
    <div className='settings'>
      <DownloadJSON />
      <SetNewJSON />
    </div>
  )
}
