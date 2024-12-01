// const input = new TextDecoder().decode(
//     await Bun.file(__dirname + "/test").bytes(),
// );
const input = new TextDecoder().decode(
    await Bun.file(__dirname + "/input").bytes(),
);
const lines = input.split("\n");

type Pair = {
    left: number;
    right: number;
};
const leftList: number[] = [];
const rightList: number[] = [];

function process_line(line: string) {
    const [left, right] = line.split("   ");

    if (!isNaN(+left) && !isNaN(+right)) {
        leftList.push(Number.parseInt(left));
        rightList.push(Number.parseInt(right));
    }
}

lines.forEach((line) => {
    process_line(line);
});

const pairs: Pair[] = [];

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

for (let i = 0, len = leftList.length; i < len; i++) {
    pairs.push({ left: leftList[i], right: rightList[i] });
}

export function part1(): number {
    let sum = 0;
    pairs.forEach((pair) => {
        const farApart = () => {
            const temp = pair.right - pair.left;
            return temp >= 0 ? temp : -temp;
        };

        sum += farApart();
    });

    return sum;
}

export function part2() {
    const map = new Map<number, number>();

    pairs.forEach((pair) => {
        const right = map.get(pair.right);
        right === undefined
            ? map.set(pair.right, 1)
            : map.set(pair.right, right + 1);
    });

    let sum = 0;
    leftList.forEach((left) => {
        const item = map.get(left) || 0;
        sum += left * item;
    });
    return sum;
}
