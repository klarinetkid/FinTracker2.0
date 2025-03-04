import { createContext } from "react";
import ToastNotification, {
    ToastNotificationProps,
} from "../components/ToastNotification";

export class ToastNotificationManager {
    public notifs: ToastNotificationProps[];
    public setNotifs: React.Dispatch<
        React.SetStateAction<ToastNotificationProps[]>
    >;

    constructor(state) {
        [this.notifs, this.setNotifs] = state;
    }

    public AddToast(notif: ToastNotificationProps) {
        const newNotifs = [...this.notifs, notif];
        this.setNotifs(newNotifs);
    }

    public Render() {
        return this.notifs.map((n, i) => <ToastNotification key={i} {...n} />);
    }
}

export const ToastNotificationContext =
    createContext<ToastNotificationManager | null>(null);
