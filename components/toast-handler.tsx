"use client";

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formatDate } from "@/utils/utils";

function useMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}

const ToastHandler = ({ status, event_name, event_date }: { status?: string; event_name?: string; event_date?: string }) => {   
    const mounted = useMounted();

    useEffect(() => {
        if (!mounted) return;

        // Check the status and display the appropriate toast
        switch (status) {
            case 'canceled':
                toast.error("Payment cancelled. No event has been created.");
                break;
            case 'failed':
                toast.error("Payment failed. Please try again.");
                break;
            case 'completed':
                toast.success(`"${ event_name }" has been created`, {
                    description: formatDate(event_date as string),
                });
                break;
            default:
                break; // Do nothing if status is not recognized
        }
    }, [mounted, status, event_name, event_date]);

    return null;
};

export default ToastHandler;
