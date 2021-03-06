
const regs = {
    isChinese: /^[\u0391-\uFFE5]+$/,
    //手机号
    mobile: /^(1[3457689]{1})+\d{9}$/,
    // 密码为（6-14位）数字+英文字母，必须同时包含字母和数字
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/,
    // 用户名
    username: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
    // 姓名为汉字
    carUsername: /^([\u4e00-\u9fa5]{2,4})$/,
    // 身份证号可以为18位或15位，允许最后一位为字母
    idCard: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,

    // 账号1-30个纯数字
    bankAccountNumber: /^[\d]{1,30}$/,
    //道路运输许可证最大1-50个字段，可以纯数字，汉字+数字,字母+数字
    transportOperation: /^[^`~!@#$%^&*()+=|{}':;',]{1,50}$/,
    //车牌号码为首字母为汉字，第二位是字母，后5位可以为纯数字，数字+字母
    carNo: /(^[\u4E00-\u9FA5]{1}[a-zA-Z0-9]{6}$)|(^[A-Za-z]{2}[A-Za-z0-9]{2}[A-Za-z0-9\u4E00-\u9FA5]{1}[A-Za-z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Za-z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Za-z]{2}[0-9]{5}$)|(^(08|38){1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警军港澳]{1}$)/,
    // 驾驶证号为15位或者18位，可以数字加字母，与身份证相同
    driverLicence: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,
    // //保留到两位小数
    // twoDecimal: /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/,
    //保留两位小数，可以为整数，一位和两位小数
    twoDecimal: /^(?!0+$)(?!0*\.0*$)\d{1,8}(\.\d{1,2})?$/,
    sevenPlusTwoDecimal: /^(\d{0,7}?(\.\d{1,2})?|0\.\d{1,2})$/,
    //座机号+手机号（3-8；4-7；手机号）
    phoneNumber: /^(\d{3}-)?\d{8}$|^(\d{4}-)?\d{7}$|^(1[3457689]{1})+\d{9}$/,
    //是否包含汉字：
    isHasChinese: /[\u4E00-\u9FA5]/g,
    //判断日期格式为YYYY-MM-DD hh:mm
    isDate: /^\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}$/,
    //判断日期格式为YYYY-MM-DD hh:mm:ss
    isDateSec: /^\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}\:\d{2}$/
};

class Regex {

    test(type, input = '') {
        console.log('type is ', type, ' input is ', input);
        const reg = regs[type];
        if (!type) throw new Error('未找到正确匹配的正则类型');
        if (!reg) throw new Error(`还未配置${ type }正则表达式`);
        return reg.test(input);
    }

}

export default new Regex();

/*
* 正则表达式校验
* 使用：if (!Regex.test('idCard', (this.state.idCard))) return Toast.show('身份证输入格式错误')
*/