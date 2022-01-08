import React from 'react';

import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const Modal = ({ children, show }) => {

  const ref = React.useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    ref.current = document.querySelector('#modal-portal');
    setMounted(true);
  }, []);

  if (!show || !mounted) return null;

  return createPortal(
    <>
      <main className="top-0 left-0 right-0 bottom-0 fixed z-10 bg-black/50">
        {children}
      </main>
    </>,
    ref.current
  );
}

export default Modal