// place files you want to import through the `$lib` alias in this folder.
//
export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
