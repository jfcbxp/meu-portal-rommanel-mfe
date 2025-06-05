import { useEffect, useState } from 'react';

const useIsOpened = (opened?: boolean) => {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    setIsOpened(opened);
  }, [opened]);
  return isOpened;
};

export default useIsOpened;
