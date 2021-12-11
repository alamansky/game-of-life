export default function createNestedArray(rows, cols, defaultValue = null) {
    return new Array(rows).fill(null).map(x => new Array(cols).fill(defaultValue));
}