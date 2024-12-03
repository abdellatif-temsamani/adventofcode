import fs from "node:fs";

const mul = (x: number, y: number): number => x * y;

function part1(line: string): number {
    let sum = 0;
    const matches = line.matchAll(/mul\((\d+),(\d+)\)/g);

    matches.forEach((match) => {
        console.log(`Number.parseInt(match[1]) ${Number.parseInt(match[2])}`);
        sum += mul(Number.parseInt(match[1]), Number.parseInt(match[2]));
    });

    return sum;
}

function part2(line: string): number {
    let sum = 0;

    const donts = line.split("do()");

    donts.forEach((val) => {
        const line = val.split("don't()")[0];
        sum += part1(line);
    });

    return sum;
}

function main() {
    const path = "data/day3/input.txt";

    const input = fs.readFileSync(path, "utf-8");

    const lines = input.split("\n").filter((val) => val !== "");

    // let part1Res = 0;
    // lines.forEach((line) => {
    //     part1Res += part1(line);
    // });

    // console.log(`part 1 = ${ part1Res }`);

    let part2Res = 0;

    /* lines.forEach((line) => {
        part2Res += part2(line);
    }); */

    part2Res += part2(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
    );
    console.log(`part 2 = ${part2Res}`);
}

main();
