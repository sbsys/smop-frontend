/* react */
import { DragEvent, MutableRefObject, useRef, useState } from 'react';

interface InputProps {
    onDragEnter: (event: DragEvent<HTMLElement>) => void;
    onDragOver: (event: DragEvent<HTMLElement>) => void;
    onDragLeave: (event: DragEvent<HTMLElement>) => void;
    onDrop: (event: DragEvent<HTMLElement>) => void;
    ref: MutableRefObject<HTMLInputElement | null>;
}

export const useDragAndDropFiles = (): [InputProps, boolean] => {
    /* states */
    const [isDragging, setIsDragging] = useState<boolean>(false);

    /* file input reference */
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDrag = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'dragenter' || event.type === 'dragover')
            setIsDragging(true);
        else setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(false);

        if (event.dataTransfer.files.length < 1 || !inputRef.current) return;

        inputRef.current.files = event.dataTransfer.files;

        inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const props: InputProps = {
        onDragEnter: handleDrag,
        onDragOver: handleDrag,
        onDragLeave: handleDrag,
        onDrop: handleDrop,
        ref: inputRef,
    };

    return [props, isDragging];
};
