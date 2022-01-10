import React from 'react';
/* 
 * determine if the website is being viewed on a small device or not
 */
const useIsSmallDevice = () => {
  const [isSmallDevice, setIsSmallDevice] = React.useState(false);

  React.useEffect(() => {
    // get screen size on initial load
    setIsSmallDevice(window.innerWidth < 768);

    // change navbar if screen is resized
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmallDevice;
}

export default useIsSmallDevice;