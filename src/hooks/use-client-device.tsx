import { useState } from 'react';

const useClientDevice = () => {
  if ("ontouchstart" in document.documentElement) {
    return 'touchscreen'
  } else {
    return 'desktop'
  }
}

export default useClientDevice;
