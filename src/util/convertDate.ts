export const convertToKoreanTime = (utcTime: string) => {
    const date = new Date(utcTime);
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}

export const ChatTimeToKoreanTime = (utcTime: string)=> {

    const utcDate = new Date(utcTime)

    // 한국 시간으로 변환하여 표시
    const koreanDateStr = utcDate.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return koreanDateStr;
}

export const ClassificianDate = (utcTime: string) => {
    const utcDate = new Date(utcTime)

    // 한국 시간으로 변환하여 표시
    const koreanDateStr = utcDate.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return koreanDateStr;
}

export const ChatTime = (utcTime: string)=> {

    const utcDate = new Date(utcTime)

    // 한국 시간으로 변환하여 표시
    const koreanDateStr = utcDate.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit'
    });

    return koreanDateStr;
}