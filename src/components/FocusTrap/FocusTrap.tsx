import { useEffect, ReactNode, useRef } from 'react';
import styles from './FocusTrap.module.css';
import { MODAL_FOCUS_CLASSNAME } from '@/constants/constants';

interface IFocusTrapProps {
  children: ReactNode;
}

const FocusTrap: React.FC<IFocusTrapProps> = ({ children }) => {
  const trapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalElement = trapRef.current;
    //add any focusable HTML element you want to include to this string
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKeyPress = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    modalElement.addEventListener('keydown', handleTabKeyPress);
    return () => {
      modalElement.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [trapRef]);

  return (
    <div ref={trapRef} className={`${MODAL_FOCUS_CLASSNAME} ${styles.container}`} tabIndex={-1}>
      {children}
    </div>
  );
};

export default FocusTrap;
