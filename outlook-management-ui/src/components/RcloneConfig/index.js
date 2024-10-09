import React from 'react';
import ConfigForm from './ConfigForm';
import MountForm from './MountForm';
import SyncForm from './SyncForm';
import ServeForm from './ServeForm';

const RcloneConfig = () => (
  <div>
    <ConfigForm />
    <MountForm />
    <SyncForm />
    <ServeForm />
  </div>
);

export default RcloneConfig;
