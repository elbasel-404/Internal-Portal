export const defaultDays = Array.from({ length: 31 }, (_, i) => ({
    id: (i + 1),
    name: (i + 1).toString(),
}));


export const defaultYears = Array.from({ length: 20 }, (_, i) => {
    const year = 2020 + i;
    return { id: year, name: year.toString() };
});