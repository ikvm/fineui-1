import isNil from 'lodash/isNil'
import isKey from '../utils/isKey'
export default {
    isDarkColor (hex) {
        if (!hex) {
            return false;
        }
        const rgb = this.rgb2json(this.hex2rgb(hex));
        const grayLevel = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);
        if (grayLevel < 192) {
            return true;
        }
        return false;
    },

    rgb2hex (rgbColour) {
        if (!rgbColour || rgbColour.substr(0, 3) !== 'rgb') {
            return '';
        }
        const rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        const red = parseInt(rgbValues[0]);
        const green = parseInt(rgbValues[1]);
        const blue = parseInt(rgbValues[2]);

        const hexColour = '#' + this.int2hex(red) + this.int2hex(green) + this.int2hex(blue);

        return hexColour;
    },

    rgb2json (rgbColour) {
        if (!rgbColour) {
            return {};
        }
        const rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        return {
            r: parseInt(rgbValues[0]),
            g: parseInt(rgbValues[1]),
            b: parseInt(rgbValues[2])
        };
    },

    rgba2json (rgbColour) {
        if (!rgbColour) {
            return {};
        }
        const rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        return {
            r: parseInt(rgbValues[0]),
            g: parseInt(rgbValues[1]),
            b: parseInt(rgbValues[2]),
            a: parseFloat(rgbValues[3])
        };
    },

    json2rgb (rgb) {
        if (!isKey(rgb.r) || !isKey(rgb.g) || !isKey(rgb.b)) {
            return '';
        }
        return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    },

    json2rgba (rgba) {
        if (!isKey(rgba.r) || !isKey(rgba.g) || !isKey(rgba.b)) {
            return '';
        }
        return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
    },

    int2hex (strNum) {
        const hexdig = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        return hexdig[strNum >>> 4] + '' + hexdig[strNum & 15];
    },

    hex2rgb (color) {
        if (!color) {
            return '';
        }
        let tempValue = 'rgb(', colorArray;

        if (color.length === 7) {
            colorArray = [parseInt('0x' + color.substring(1, 3)),
                parseInt('0x' + color.substring(3, 5)),
                parseInt('0x' + color.substring(5, 7))];
        }
        else if (color.length === 4) {
            colorArray = [parseInt('0x' + color.substring(1, 2)),
                parseInt('0x' + color.substring(2, 3)),
                parseInt('0x' + color.substring(3, 4))];
        }
        tempValue += colorArray[0] + ',';
        tempValue += colorArray[1] + ',';
        tempValue += colorArray[2] + ')';

        return tempValue;
    },

    rgba2rgb (rgbColour, BGcolur) {
        if (isNil(BGcolur)) {
            BGcolur = 1;
        }
        if (rgbColour.substr(0, 4) !== 'rgba') {
            return '';
        }
        const rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        if (rgbValues.length < 4) {
            return '';
        }
        const R = parseFloat(rgbValues[0]);
        const G = parseFloat(rgbValues[1]);
        const B = parseFloat(rgbValues[2]);
        const A = parseFloat(rgbValues[3]);

        return 'rgb(' + Math.floor(255 * (BGcolur * (1 - A )) + R * A) + ',' +
            Math.floor(255 * (BGcolur * (1 - A )) + G * A) + ',' +
            Math.floor(255 * (BGcolur * (1 - A )) + B * A) + ')';
    }
}
