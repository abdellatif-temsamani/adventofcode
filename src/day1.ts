import fs from "node:fs";

type Pair = {
    left: number;
    right: number;
};

type Lists = {
    left: number[];
    right: number[];
};

function processLine(lists: Lists, line: string) {
    const [left, right] = line.split("   ");
    if (!isNaN(+left) && !isNaN(+right)) {
        lists.left.push(Number.parseInt(left));
        lists.right.push(Number.parseInt(right));
    }
}

function sortLists(lists: Lists) {
    lists.left.sort((a, b) => a - b);
    lists.right.sort((a, b) => a - b);
}

function getPairs(pairs: Pair[], lists: Lists) {
    for (let i = 0, len = lists.left.length; i < len; i++) {
        pairs.push({ left: lists.left[i], right: lists.right[i] });
    }
}

export function part1(pairs: Pair[]): number {
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

export function part2(pairs: Pair[]) {
    const map = new Map<number, number>();

    pairs.forEach((pair) => {
        const right = map.get(pair.right);
        right === undefined
            ? map.set(pair.right, 1)
            : map.set(pair.right, right + 1);
    });

    let sum = 0;
    pairs.forEach((pair) => {
        const item = map.get(pair.left) || 0;
        sum += pair.left * item;
    });
    return sum;
}

async function main() {
    const input = new TextDecoder().decode(
        // await Bun.file("./data/day1/test").bytes(),
        await Bun.file("./data/day1/input").bytes(),
    );

    const lines = input.split("\n");
    const lists: Lists = {
        left: [],
        right: [],
    };
    const pairs: Pair[] = [];

    lines.forEach((line) => {
        processLine(lists, line);
    });

    sortLists(lists);

    getPairs(pairs, lists);

    const part_1 = part1(pairs);
    console.log(`SUM is ${part_1}`);

    const part_2 = part2(pairs);
    console.log(`SUM is ${part_2}`);
}

await main();
