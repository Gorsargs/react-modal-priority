import { useCurrentModal } from '@/context/CurrentModalContext';
import { useModalContext } from '@/context/ModalContext';
import { useState } from 'react';
import styles from './Card.module.css';
import shortid from 'shortid';
import { Modal } from 'antd';

const Card = ({ title, description }: { title: string; description?: { title: string } }) => {
  const { closeModal } = useCurrentModal();
  const { showModal } = useModalContext();
  const [num, setNum] = useState(0);

  const onAddClick = () => {
    setNum(num + 1);
  };

  return (
    <div className={styles.container}>
      {/* <div className="relative p-2 w-[200px] h-[200px] bg-blue-900 text-white rounded-xl"> */}
      {/* <div className="absolute top-2 right-2 w-max cursor-pointer" onClick={closeModal}> */}
      <button className={`${styles.closeBtn} btn`} onClick={closeModal}>
        X
      </button>
      <p>{title}</p>
      <p>{num}</p>
      <button onClick={onAddClick}>Add</button>
      <button
        onClick={() => {
          showModal<typeof Modal>({
            component: Modal,
            containerProps: {
              horizontalPlacement: ['end', 'start', 'center'][Math.floor(Math.random() * 3)] as any,
              verticalPlacement: ['end', 'start', 'center'][Math.floor(Math.random() * 3)] as any,
            },
            componentProps: {
              title: 'Antd modal',
            },
            id: shortid.generate(),
            priority: 10,
          });
        }}
      >
        Add Modal
      </button>
      <p>{description?.title}</p>
    </div>
  );
};

export default Card;
