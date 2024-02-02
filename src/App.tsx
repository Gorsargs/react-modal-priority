import { Modal } from 'antd';
import './App.css';
import { Card } from './components/Card';
import { useModalContext } from './context/ModalContext';
import shortid from 'shortid';

const intervalModalSuperPriority = 'interval_modal_super_priority';

const Button = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <div className="btn" onClick={() => onClick()}>
      {title}
    </div>
  );
};

function App() {
  const { showModal, deleteIntervalModal } = useModalContext();

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 10000,
          display: 'flex',
          padding: 10,
          gap: 20,
        }}
      >
        <Button
          onClick={() => {
            showModal<typeof Card>({
              component: Card,
              componentProps: {
                title: 'Super Priority With Interval',
              },
              id: Math.random().toString(),
              containerProps: {
                horizontalPlacement: 'center',
                verticalPlacement: 'center',
              },
              interval: 1000,
              superPriority: true,
            });
          }}
          title="Super Priority With Interval"
        />
        <Button
          onClick={() => {
            showModal<typeof Card>({
              component: Card,
              componentProps: {
                title: 'Super Priority',
              },
              id: Math.random().toString(),
              containerProps: {
                horizontalPlacement: 'center',
                verticalPlacement: 'center',
              },
              superPriority: true,
            });
          }}
          title="Super Priority"
        />
        <Button
          onClick={() => {
            showModal<typeof Card>({
              component: Card,
              componentProps: { title: 'Regular Priority Modal' },
              id: Math.random().toString(),
              containerProps: {
                horizontalPlacement: 'center',
                verticalPlacement: 'center',
              },
              priority: 9,
            });
          }}
          title="Regular Modal"
        />
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
          <Button
            onClick={() => {
              showModal<typeof Card>({
                component: Card,
                componentProps: {
                  title: 'Interval Modal Super Priority',
                },
                id: intervalModalSuperPriority,
                superPriority: true,
                interval: 2000,
              });
            }}
            title="Interval Modal Super Priority"
          />
          <Button
            title="delete Interval Modal"
            onClick={() => {
              deleteIntervalModal(intervalModalSuperPriority);
            }}
          />
        </div>
        <Button
          onClick={() => {
            setTimeout(() => {
              showModal<typeof Card>({
                component: Card,
                componentProps: {
                  title: 'Async Modal',
                },
                id: Math.random().toString(),
              });
            }, 2000);
          }}
          title="Async Modal"
        />

        <Button
          onClick={() => {
            showModal<typeof Modal>({
              component: Modal,
              componentProps: {
                title: 'andt modal',
                children: <Card title="inside Card" />,
              },
              id: 'antd modal keep mounted',
              interval: 1000,
              keepMounted: true,
            });
          }}
          title="Antd modal keep mounted"
        />
        <Button
          onClick={() => {
            showModal<typeof Card>({
              component: Card,
              componentProps: {
                title: 'title',
                description: {
                  title: 'sd',
                },
              },
              keepMounted: false,
              id: shortid.generate(),
              priority: 100,
            });
          }}
          title="Priority modal"
        />
      </div>
    </>
  );
}

export default App;
