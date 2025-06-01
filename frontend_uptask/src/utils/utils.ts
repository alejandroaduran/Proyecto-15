export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',

    });
    return formatter.format(date);
}