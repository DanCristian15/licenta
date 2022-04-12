export function hasIncorrectContentSize ( imgEl ) {
    return imgEl.naturalWidth <= 1 && imgEl.naturalHeight <= 1;
}