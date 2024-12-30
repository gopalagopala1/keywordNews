  const parseInput = (input: string) => {
    // handle empty string
    if (!input?.trim()) {
      return [];
    }

    // Split by comma first, then by space, and flatten the result
    return input
      .split(",")
      .flatMap((item) => item.trim().split(" "))
      .filter((item) => item.length > 0)
      .map((item) => item.toLowerCase());
  };

  const newsUtils = {
    parseInput
  };

  export default newsUtils;