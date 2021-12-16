


export const sortBy = (value: string, lista: any[]) => {
    const listNumber = (lista.filter(valueList => !isNaN(valueList?.[value])));
    const listText = (lista.filter(valueList => isNaN(valueList?.[value])));
    const sortedListText = listText?.sort((a: any, b: any) => {
        if (a?.[value] === b?.[value]) {
            return 0;
        }
        return a?.[value].toLowerCase() > b?.[value].toLowerCase() ? 1 : -1;
    });
    const sortedListNumber = listNumber?.sort((a: any, b: any) => Number(a?.[value]) - Number(b?.[value]));
    return [...sortedListNumber, ...sortedListText];
};


export const filterBy = (value: string[], list: any[]) => {
    if (value.includes('all')) {
        return [...list]
    }
    return [...list.filter(item => value?.includes(item?.type?.toUpperCase().replaceAll(' ', '')))] || []
}
