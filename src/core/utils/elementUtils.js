export function getDistanceScrollFromBottom( el ) {
    const { scrollHeight, scrollTop, offsetHeight } = el;

    return scrollHeight - scrollTop - offsetHeight;
}
