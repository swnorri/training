import { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ open, children, onClose }, ref) {
    const dialog = useRef();

    useEffect(() => {
        dialog.current[open ? 'showModal' : 'close']();
        dialog.current.addEventListener('click', (e) => {
            const rect = dialog.current.getBoundingClientRect();
            if (e.clientY < rect.top ||
                e.clientY > rect.bottom ||
                e.clientX < rect.left ||
                e.clientX > rect.right
            ) {
                dialog.current.close();
            }
        });
    }, [open]);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        }
    });

    return createPortal(
        <dialog
            className="modal"
            ref={dialog}
            onClose={onClose}
        >
            {
                open ? children : null
            }
        </dialog>,
        document.getElementById('modal')
    );
});

export default Modal;