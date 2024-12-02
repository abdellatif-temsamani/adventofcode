import * as fs from "node:fs";

function validateLevels(levels: number[]): {
    isIncreasing: boolean;
    isDecreasing: boolean;
} {
    const isIncreasing = levels.every(
        (_, i) =>
            i === 0 ||
            (levels[i] - levels[i - 1] >= 1 && levels[i] - levels[i - 1] <= 3),
    );

    const isDecreasing = levels.every(
        (_, i) =>
            i === 0 ||
            (levels[i - 1] - levels[i] >= 1 && levels[i - 1] - levels[i] <= 3),
    );

    return {
        isIncreasing,
        isDecreasing,
    };
}

function processLine(line: string) {
    const levels: number[] = line.split(" ").map(Number);
    const res = validateLevels(levels);

    if (!res.isIncreasing && !res.isDecreasing) {
        for (let i = 0, len = levels.length; i < len; i++) {
            let temp: number[] = levels.filter((_, index) => index !== i);
            const tempRes = validateLevels(temp);

            if (tempRes.isIncreasing || tempRes.isDecreasing) {
                return true;
            }
        }
    }

    return res.isIncreasing || res.isDecreasing;
}
function main() {
    const path = {
        test: "./data/day2/test",
        input: "./data/day2/input",
    };
    const data = fs.readFileSync(path.input, "utf-8");

    const lines = data
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

    const res: boolean[] = [];

    lines.forEach((line) => {
        res.push(processLine(line));
    });

    // console.log(res);
    console.log(res.filter((val) => val).length);
}

main();
