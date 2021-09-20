import { useMemo } from 'react';
import { getPagesArray } from '../utils/page';

export const usePagination = totalPages => {
    const pagesArray = useMemo(() => getPagesArray(totalPages), [totalPages]);

    return pagesArray;
};
