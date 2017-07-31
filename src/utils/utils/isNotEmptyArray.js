import isArray from 'lodash/isArray'
export default function (arr) {
    return isArray(arr) && arr.length > 0;
}
