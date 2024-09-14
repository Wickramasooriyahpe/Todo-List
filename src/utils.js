export const calculateAverageScore = (data) => {
    const totalScore = data.reduce((acc, item) => acc + item.Score, 0);
    return totalScore / data.length;
  };
