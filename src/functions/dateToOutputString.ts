export default function dateToOutputString(date: Date) {
    return date.toISOString().split('T')[0].split("-").reverse().join("/");
}