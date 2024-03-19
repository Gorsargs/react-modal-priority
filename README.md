
# react-modal-priority

  

react-priority-modal is a lightweight, easy-to-use library for managing the priority of modals in web applications. This library allows developers to control which modal appears on top of others based on a flexible priority system.

  

## Features

  

-  **Priority-Based Modal Management**: Easily assign priorities to modals to control their stacking order.

-  **Dynamic Priority Adjustment**: Change the priorities of modals on the fly.

-  **Event Handling**: Ensure higher priority modals receive events first.

-  **Cross-Platform Compatibility**: Works seamlessly across different browsers and devices.

-  **Easy Integration**: Designed to be easily integrated into existing projects.

  

## Installation
```js
npm install react-modal-priority
```

## Quickstart
```ts
//wrap App inside of ModalProvider
import  App  from  "./App.tsx";
import { ModalProvider } from  "react-modal-priority";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ModalProvider>
			<App  />
		</ModalProvider>
	</React.StrictMode>
);
```
###  in the App.tsx
```ts
import { usePriorityModal } from  "react-modal-priority";

const Modal = ({ onClose } : { onClose : () => void; }) => 
	(
		<div>
			My Awesome Modal
			<button onClick={onClose}>Close</button>
		</div>
	);

const App = () => {

	const { showModal, closeModal } = usePriorityModal();
	
	const handleCloseModal = () => {
		closeModal("my_awesome_modal_id");
	}

	const handleOnClick = () => showModal({
		component:  Modal,
		componentProps: {
			onClose: handleCloseModal;
		}
		id: "my_awesome_modal_id",
		priority:  10,
	});
	
	
	
	return (
		<div>
			<button onClick={handleOnClick}>show modal</button>
		</div>
	);
}
```
## Advanced Usage
### Component Props Types
```jsx
import { usePriorityModal } from  "react-modal-priority";

const ProfileCard = ({
	name,
	surname,
	age,
}: {
	name:  string;
	surname:  string;
	age:  number;
}) => (
	<div>
		<p>{name}</p>
		<p>{surname}</p>
		<p>{age}</p>
	</div>
);

const App = () => {
	const { showModal } = usePriorityModal();
	const handleOnClick = () => showModal<typeof ProfileCard>({
		component:  Modal,
		componentProps: {
			name: "Jubei",
			surname: "Kibagami",
			age: 26
		}
		id: "my_awesome_modal_id",
		priority:  1,
	});
	
	return (
		<div>
			<button onClick={handleOnClick}>show modal</button>
		</div>
	);
}
```
### useCurrentModal
>##### *Usint this approach you can avoid of passing closeModal function to the component to close it, instead you can use useCurrentModal inside the component and close it directly without using ID*
```jsx
import { usePriorityModal, useCurrentModal } from  "react-modal-priority";

const Modal = () => (
	const { closeModal } = useCurrentModal();
	<div>
		<p>My Awesome Modal</p>
		<button onClick={()=>closeModal()}>Close Modal</button>
	</div>
);

const App = () => {
	const { showModal } = usePriorityModal();
	const handleOnClick = () => showModal<typeof Modal>({
		component:  Modal,
		//id: "my_awesome_modal_id",
		priority:  1000,
	});
	
	return (
		<div>
			<button onClick={handleOnClick}>show modal</button>
		</div>
	);
}
```
### Super Priority
>*Modals with `superPriority: true` option will appear on the top of the all modals regardless of priorities of other modals*
```js
const Modal = () => <div>My Awesome Modal</div>

//This modal has higher priority
showModal({
	component : Modal,
	superPriority: true
});

//This modal has lower priority
showModal({
	component: Modal,
	priority: 99999
});
```

### Super Priority
>*Modals with `keepMounted: true` option will remain in the HTML tree even after closing the modal*
```js
const Modal = () => <div>My Awesome Modal</div>

//Closing this will not remove the rendered html from the browser
showModal({
	component : Modal,
	keepMounted: true,
});
```
### Interval
>*Modals with e.g `interval: 1000` option will be back after `1000 milliseconds`*
```js
const Modal = () => {
	//After closing this modal it will be back after 1000 milliseconds
	const { closeModal } = useCurrentModal();
	return (
		<div>
			<p>My Awesome Modal</p>
			<button onClick={closeModal}></button>
		</div>
	);
}

showModal({
	component : Modal,
	interval: 1000,
});
```
### deleteIntervalModal
```js
import { usePriorityModal, useCurrentModal } from  "react-modal-priority";

const Modal = () => (
	const { closeModal } = useCurrentModal();
	<div>
		<p>My Awesome Modal</p>
		<button onClick={closeModal}>Close Modal</button>
	</div>
);

const App = () => {
	const { showModal, deleteIntervalModal } = usePriorityModal();
	const handleOnClick = () => showModal<typeof Modal>({
		component:  Modal,
		id: "my_awesome_interval_modal",
		interval: 1000
	});
	
	return (
		<div>
			<button onClick={handleOnClick}>Show Interval Modal</button>
			<buttononClick{()=>deleteIntervalModal("my_awesome_interval_modal")}>Delete Interval Modal</button>
		</div>
	);
}
```