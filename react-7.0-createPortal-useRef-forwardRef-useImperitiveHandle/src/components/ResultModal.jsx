import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ remainingTime, tgtTime, onReset }, ref) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formatTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (tgtTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>Target time was <strong>{tgtTime} secs.</strong></p>
            <p>You stopped the timer <strong>with {formatTime} secs left.</strong></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;