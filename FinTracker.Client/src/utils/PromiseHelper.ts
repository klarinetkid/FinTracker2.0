export async function minimumTime<T>(
    millis: number,
    func: () => Promise<T>
): Promise<T> {
    const startTime = new Date().getTime();
    const variance = Math.random() + 0.5;
    return new Promise((resolve, reject) => {
        func()
            .then((result) => {
                const elapsed = new Date().getTime() - startTime;
                const remaining = Math.max(millis * variance - elapsed, 0);

                setTimeout(() => {
                    resolve(result);
                }, remaining);
            })
            .catch((result) => {
                reject(result);
            });
    });
}
