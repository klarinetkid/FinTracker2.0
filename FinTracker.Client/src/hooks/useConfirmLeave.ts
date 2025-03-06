import { useEffect } from "react";

function useConfirmLeave(shouldBlock: () => boolean) {
    const onBeforeUnload = (ev: BeforeUnloadEvent) => {
        if (shouldBlock()) ev.preventDefault();
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [shouldBlock]);
}

export default useConfirmLeave;
