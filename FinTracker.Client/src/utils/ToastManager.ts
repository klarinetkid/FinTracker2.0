import EventEmitter from "./EventEmitter";
import { ToastNotificationProps } from "../components/ToastNotification";

const TOAST_EVENT_ADD = "toast_add";
const TOAST_EVENT_EXPIRE = "toast_exp";

class ToastNotificationManager {
    addToast(notif: ToastNotificationProps) {
        const id = crypto.randomUUID();
        EventEmitter.emit(TOAST_EVENT_ADD, { id, ...notif });
    }

    expireToast(id: string) {
        EventEmitter.emit(TOAST_EVENT_EXPIRE, id);
    }

    on(
        add: (notif: ToastNotificationProps) => void,
        expire: (id: string) => void
    ) {
        EventEmitter.on(TOAST_EVENT_ADD, add);
        EventEmitter.on(TOAST_EVENT_EXPIRE, expire);
    }

    off(
        add: (notif: ToastNotificationProps) => void,
        expire: (id: string) => void
    ) {
        EventEmitter.off(TOAST_EVENT_ADD, add);
        EventEmitter.off(TOAST_EVENT_EXPIRE, expire);
    }

    //onToastAdd(listener: (notif: ToastNotificationProps) => void) {
    //    EventEmitter.on(TOAST_EVENT_ADD, listener);
    //}
    //offToastAdd(listener: (notif: ToastNotificationProps) => void) {
    //    EventEmitter.off(TOAST_EVENT_ADD, listener);
    //}

    //onToastExpire(listener: (id: string) => void) {
    //    EventEmitter.on(TOAST_EVENT_EXPIRE, listener);
    //}
    //offToastExpire(listener: (id: string) => void) {
    //    EventEmitter.off(TOAST_EVENT_EXPIRE, listener);
    //}
}

export default new ToastNotificationManager();
