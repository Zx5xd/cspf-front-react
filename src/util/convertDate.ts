export const convertToKoreanTime = (utcTime: string) => {
    const date = new Date(utcTime);
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}