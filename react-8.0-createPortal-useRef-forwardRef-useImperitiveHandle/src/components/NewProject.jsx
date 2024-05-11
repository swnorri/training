import { useRef } from 'react';

import Input from './Input.jsx'
import Button from './Button.jsx';
import Modal from './Modal.jsx';


export default function NewProject({ onAdd, onCancel }) {
    const titleRef = useRef();
    const descRef = useRef();
    const dateRef = useRef();
    const modalRef = useRef();

    function handleCancel() {
        onCancel();
    }
    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDesc = descRef.current.value;
        const enteredDate = dateRef.current.value;

        if (enteredTitle.trim() === '' ||
            enteredDesc.trim() === '' ||
            enteredDate.trim() === ''
        ) {
            modalRef.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDesc,
            dueDate: enteredDate
        });
    }

    return (
        <>
            <Modal 
                ref={modalRef}
                buttonCaption="Close"
            >
                <h2 className="text-xl font-bold text-stone-700 my-4" >Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
            </Modal>            
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button onClick={handleCancel}
                            className="text-stone-800 hover:text-stone-950">Cancel</button>
                    </li>
                    <li>
                        <Button onClick={handleSave}>Save</Button>
                    </li>
                </menu>
                <div>
                    <Input ref={titleRef} label="Title" type="text" />
                    <Input ref={descRef} label="Description" textarea />
                    <Input ref={dateRef} label="Due Date" type="date" />
                </div>
            </div>
        </>
    )
}