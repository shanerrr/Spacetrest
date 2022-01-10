import React from 'react';

import { createPortal } from 'react-dom';

type ReactNode =
  | React.ReactChild
  | ReadonlyArray<ReactNode>
  | React.ReactPortal
  | boolean
  | null
  | undefined;

const Modal = ({ children, show, backdropRef }: { children: ReactNode, show: boolean, backdropRef: any }) => {

  const ref = React.useRef<HTMLHeadingElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    ref.current = document.querySelector('#modal-portal');
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (show) {
      TweenLite.to(
        backdropRef.current,
        .5,
        {
          opacity: 1,
          ease: Power3.easeInOut
        }
      )
    }
  }, [children]);

  if (!show || !mounted) return null;

  return createPortal(
    <main ref={backdropRef} className="top-0 left-0 right-0 bottom-0 fixed z-10 bg-black/75 opacity-0">
      {children}
    </main>,
    ref.current as HTMLElement
  );
}

export default Modal