export const Base64UTF8Decoder = (base64String: string) => {
    try {
            // Base64 문자열을 디코딩하여 바이트 배열 생성
            const binaryString = atob(base64String);
            const bytes = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // UTF-8로 변환
            const textDecoder = new TextDecoder('utf-8');
            const decoded = textDecoder.decode(bytes)
            return decoded;
        } catch (error) {
            console.error('Failed to decode Base64:', error);
        }
};