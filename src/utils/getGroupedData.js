export const getGroupedData = async (data, userDailyNorm) => {
    const groupedData = new Map();

    await data.forEach(item => {
        const date = new Date(item.date);
        const dayKey = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`; 

        if (groupedData.has(dayKey)) {
          const existingData = groupedData.get(dayKey);
          existingData.dailyNorm += 0;
          existingData.waterVolume += item.waterVolume;
          existingData.count += 1;
          groupedData.set(dayKey, existingData);
        } else {

          groupedData.set(dayKey, {
            date: dayKey,
            dailyNorm: userDailyNorm,
            waterVolume: item.waterVolume,
            count: 1
          });
        }
      });


    const result = Array.from(groupedData.values()).map(entry => {
        const dailyNormAvg = entry.dailyNorm;
        const waterVolumeAvg = entry.waterVolume;
        const percent = (waterVolumeAvg / dailyNormAvg) * 100;

        return {
          date: entry.date,
          dailyNorm: dailyNormAvg,
          waterVolume: waterVolumeAvg,
          count: entry.count,
          percent: percent.toFixed(0)
        };
      });

      return result;

};
