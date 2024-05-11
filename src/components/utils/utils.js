export const facilitiesConfig = [
  {
    name: "Clubhouse",
    slotBased: true,
    slots: [
      { start: 10, end: 16, rate: 100 },
      { start: 16, end: 22, rate: 500 },
    ],
  },
  { name: "Tennis Court", slotBased: false, rate: 50 },
];

export const calculateCost = (facility, startTime, endTime) => {
  const selectedFacility = facilitiesConfig.find((f) => f.name === facility);

  if (!selectedFacility) {
    console.error("Facility not found in facilitiesConfig");
    return 0;
  }

  if (selectedFacility.slotBased) {
    const slot = selectedFacility.slots.find(
      (slot) =>
        startTime.split(":")[0] >= slot.start &&
        endTime.split(":")[0] <= slot.end
    );
    console.log("Selected Slot:", slot);

    return slot
      ? (endTime.split(":")[0] - startTime.split(":")[0]) * slot.rate
      : 0;
  } else {
    console.log("Facility Rate:", endTime.split(":")[0], selectedFacility.rate);
    return (
      (endTime.split(":")[0] - startTime.split(":")[0]) * selectedFacility.rate
    );
  }
};
