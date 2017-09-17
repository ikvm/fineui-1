import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
export default function (v) {
    return (isNumber(v) && isFinite(v)) || (isString(v) && v.length > 0);
}
