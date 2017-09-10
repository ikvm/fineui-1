/**
 * Created by Urthur on 2017/9/6.
 */
export default function isKhtml () {
    return /Konqueror|Safari|KHTML/i.test(navigator.userAgent);
}
