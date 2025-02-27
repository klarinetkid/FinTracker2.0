import { useState } from "react";

function useRefresh() {
    const [refreshed, setRefreshed] = useState(false);

    function refresh() {
        setRefreshed(!refreshed);
    }

    return { refreshed, refresh };
}

export default useRefresh;
