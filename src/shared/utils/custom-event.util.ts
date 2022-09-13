interface CustomEventMap<T> {
    [x: string]: CustomEvent<T>;
}

interface CustomDocument {
    addEventListener<T, K extends keyof CustomEventMap<T>>(
        type: K,
        listener: (this: Document, ev: CustomEventMap<T>[K]) => void
    ): void;

    removeEventListener<T, K extends keyof CustomEventMap<T>>(
        type: K,
        listener: (this: Document, ev: CustomEventMap<T>[K]) => void
    ): void;
}

const onCustomEvent = <T>(name: string, cb: (event?: CustomEvent<T>) => void) =>
    (document as CustomDocument).addEventListener<T, string>(name, cb);

const offCustomEvent = <T>(name: string, cb: (event?: CustomEvent<T>) => void) =>
    (document as CustomDocument).removeEventListener<T, string>(name, cb);

const onceCustomEvent = <T>(name: string, cb: (event?: CustomEvent<T>) => void) => {
    const handleEventOnce = (event?: CustomEvent<T>) => {
        cb(event);

        offCustomEvent(name, handleEventOnce);
    };

    onCustomEvent(name, handleEventOnce);
};

const triggerCustomEvent = <T>(name: string, data?: T) => {
    const event: CustomEvent<T> = new CustomEvent(name, { detail: data });

    document.dispatchEvent(event);
};

export { onCustomEvent, offCustomEvent, onceCustomEvent, triggerCustomEvent };
