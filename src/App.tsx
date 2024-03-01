import { useRef } from 'react';
import './App.css';
import { useCurrentModal } from './context/CurrentModalContext';
import { usePriorityModal } from './context/ModalContext';

let count = 0;

const ModalCard = () => {
  const { showModal, getModals } = usePriorityModal();
  const { closeModal } = useCurrentModal();

  console.log('modal');
  return (
    <div>
      {getModals().length}
      <button
        onClick={() => {
          count++;
          showModal<typeof ModalCard>({
            component: ModalCard,
            componentProps: {
              title: `inner Modal ${count}`,
            },
          });
        }}
      >
        add Modal
      </button>
      <button onClick={() => closeModal()}>close modal</button>
    </div>
  );
};

function App() {
  const { showModal, getModals } = usePriorityModal();
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button
        onClick={() =>
          showModal<typeof ModalCard>({
            component: ModalCard,
            componentProps: {
              title: 'super priority',
            },
            superPriority: true,
          })
        }
      >
        add super priotity
      </button>
      <button
        onClick={() =>
          showModal<typeof ModalCard>({
            component: ModalCard,
            componentProps: {
              title: 'high priority',
            },
            priority: 1000,
          })
        }
      >
        add high priotity
      </button>
      <button
        onClick={() =>
          showModal<typeof ModalCard>({
            component: ModalCard,
            componentProps: {
              title: 'high priority keep mounted',
            },
            priority: 1000,

            keepMounted: true,
            interval: 2000,
          })
        }
      >
        add persist modal
      </button>
      <button
        onClick={() =>
          showModal<typeof ModalCard>({
            component: ModalCard,
            componentProps: {
              title: 'keep mounted',
            },
            priority: 1000,
            keepMounted: true,
          })
        }
      >
        keep mounted
      </button>
      <button
        onClick={() => {
          if (divRef.current) divRef.current.textContent = getModals().length.toString();
        }}
      >
        btn
      </button>
      <div ref={divRef} />
    </div>
  );
}

export default App;
