function DateComponent({ timestamp, className }: any) {
    const timeAgo = (timestamp?: Date) => {
        timestamp = timestamp || new Date();

        const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval + " year" + (interval === 1 ? "" : "s") + " ago";
        }

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + " month" + (interval === 1 ? "" : "s") + " ago";
        }

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + " day" + (interval === 1 ? "" : "s") + " ago";
        }

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
        }

        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
        }

        return "Just now";
    };

    return (
        <span className={className}>{timeAgo(timestamp && new Date(timestamp))}</span>
    );
}

export default DateComponent;
