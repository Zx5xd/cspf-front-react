import { useCallback } from 'react';

const useEnterKey = (action: () => void) => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            action();
        }
    }, [action]);

    return {handleKeyDown};
};

export default useEnterKey;
