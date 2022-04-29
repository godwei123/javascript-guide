function countRectangles(rectangles: number[][], points: number[][]): number[] {
    rectangles.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        }
        return b[0] - a[0];
    });
    let n = rectangles.length;
    let x = new Array(n).fill(1);
    let y = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        x[i] = x[i - 1] + 1;
    }

    return [];
}
