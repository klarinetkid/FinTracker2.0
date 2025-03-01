import { useEffect } from "react";

function useConfirmLeave(shouldBlock: () => boolean) {
    const onBeforeUnload = (ev: BeforeUnloadEvent) => {
        const x = shouldBlock();
        if (shouldBlock()) ev.preventDefault();
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, []);
}

export default useConfirmLeave;
