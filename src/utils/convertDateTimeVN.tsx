const convertDateVietNam=(utcTimeString:string)=>{
    const utcDate = new Date(utcTimeString);
    utcDate.setUTCHours(utcDate.getUTCHours() + 7);
    const vietnamTime = utcDate.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    
    return vietnamTime
}
export {convertDateVietNam}