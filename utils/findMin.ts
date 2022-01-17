export function findMin(values: number[]) {
    let min = 0;
    for(const value of values) {
        if(value < min)
            min = value;
    }
    return min;
}