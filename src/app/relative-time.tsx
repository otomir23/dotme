export default function RelativeTime({timestamp}: {timestamp: number}) {
    const daysAgo = Math.ceil(
        (timestamp - Date.now()) / 1000 / 60 / 60 / 24
    )
    const timeFormatter = new Intl.RelativeTimeFormat("en-us");
    return <>
        {timeFormatter.format(
            daysAgo,
            "days"
        )}
    </>
}