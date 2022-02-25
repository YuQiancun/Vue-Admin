
// 数字转中文数字
export function toChineseNumeral(num){
    let numerals = {"-":"负", ".":"点", 0:"零", 1:"一", 2:"二", 3:"三", 4:"四", 5:"五",
        6:"六",  7:"七", 8:"八", 9:"九", 10:"十", 100:"百", 1000:"千",10000:"万" };
    // 如果num为负数
    if (num < 0) {
        return numerals['-'] + toChineseNumeral(-num);
        // num 为 0或0点几的小数
    } else if (num < 1) {
        return num.toString().split('').reduce(function(p, n) {
            return p + numerals[n];
        }, '');
    } else if (num > Math.floor(num)) {
        return toChineseNumeral(Math.floor(num)) + toChineseNumeral(parseFloat(num.toString().replace(/^.*\./, '0.'))).slice(1);
    } else {
        return [10000, 1000, 100, 10, 1].reduce(function(p, n) {
            if (num >= n) {
                if (p.ling) p.ch += numerals[0];
                p.ch += numerals[Math.floor(num / n)];
                if (n != 1) p.ch += numerals[n];
                p.ling = false;
            } else if (p.ch) {
                p.ling = true;
            }
            num %= n;
            return p;
        }, {ch: '', ling: false}).ch.replace(/^一十/, '十');
    }
}

// 数组转枚举
export function toEnumeration(obj, label = null, handle = null) {
    const type = Object.prototype.toString.call(obj)
    let enumeration = {}
    if(type === '[object Array]') {
        for (let i = 0; i < obj.length; i++) {
            let key = obj[i][label] || i
            if(Object.prototype.toString.call(handle) === "[object Function]") {
                key = handle(key)
            }
            enumeration[key] = obj[i]
        }
    }
    // if(type === '[Object Object]') {
    //
    // }
    return enumeration
}

// Object 判空 删除字段
export function objectEmpty(obj = {}) {
    let o = {...obj}
    for (const oKey in o) {
        (/^null|undefined$/.test(o[oKey]) || o[oKey] === '') && delete o[oKey]
    }
    return o
}

// 清空对象值 设置为null / 指定数值
export function objectSetNull(obj = {}, val = null, jump = null) {
    let arr = []
    const type = Object.prototype.toString.call(jump)
    if(type === '[object String]') { arr = jump.split(',') }
    if(type === '[object Array]') { arr = jump }
    for (const key in obj) {
        if(!(arr.indexOf(key) >= 0)) obj[key] = val
    }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}