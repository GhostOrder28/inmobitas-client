import { useEffect, useState } from "react";
const useOrientation = () => {
  const [orientation, setOrientation] = useState<string>();
  useEffect(() => {
    setOrientation(window.screen.orientation.type);
  }, [window.screen.orientation.type]);

  return orientation;
}

export default useOrientation;

