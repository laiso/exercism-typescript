export const answer = (question: string): number => {
  if (!question.endsWith("?")) {
    throw new Error("Unknown operation");
  }
  let expr = question.slice(0, -1);
  if (expr.startsWith("What is ")) {
    expr = expr.slice(8);
  } else if (expr.startsWith("What is")) {
    expr = expr.slice(7);
  } else {
    throw new Error("Unknown operation");
  }
  expr = expr.trim();
  const words = expr.split(/\s+/).filter(Boolean);
  const tokens: (number | string)[] = [];
  let i = 0;
  while (i < words.length) {
    const word = words[i];
    if (/^-?\d+$/.test(word)) {
      tokens.push(parseInt(word, 10));
    } else if (word === "plus") {
      tokens.push("+");
    } else if (word === "minus") {
      tokens.push("-");
    } else if (word === "multiplied" && i + 1 < words.length && words[i + 1] === "by") {
      tokens.push("*");
      i++;
    } else if (word === "divided" && i + 1 < words.length && words[i + 1] === "by") {
      tokens.push("/");
      i++;
    } else {
      throw new Error("Unknown operation");
    }
    i++;
  }
  if (tokens.length === 0 || typeof tokens[0] !== "number") {
    throw new Error("Syntax error");
  }
  for (let j = 1; j < tokens.length; j += 2) {
    if (typeof tokens[j] !== "string" || typeof tokens[j + 1] !== "number") {
      throw new Error("Syntax error");
    }
  }
  if (tokens.length % 2 === 0) {
    throw new Error("Syntax error");
  }
  let result = tokens[0] as number;
  for (let j = 1; j < tokens.length; j += 2) {
    const op = tokens[j] as string;
    const num = tokens[j + 1] as number;
    switch (op) {
      case "+":
        result += num;
        break;
      case "-":
        result -= num;
        break;
      case "*":
        result *= num;
        break;
      case "/":
        result /= num;
        break;
    }
  }
  return result;
}
