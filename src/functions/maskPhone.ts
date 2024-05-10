export default function maskPhone(phone: string) {
    const maskedPhoneArray = phone && phone.split("").map((number, index) => {
        if (index == 0) return `(${number}`;
        if (index == 1) return `${number})`;
        if (index == 2 && phone.length > 10) return ` ${number} `;
        if (index == 2 && phone.length <= 10) return ` ${number}`;
        if (index == 6 && phone.length > 10) return `${number}-`;
        if (index == 6 && phone.length <= 10) return `-${number}`;
        return number;
    })
    return maskedPhoneArray && maskedPhoneArray.join("");
}