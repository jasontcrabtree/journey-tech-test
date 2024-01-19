// do-not-refactor/PhoneCaseRepository.js
function PhoneCaseRepository() {
}
PhoneCaseRepository.prototype.getAll = function() {
  return [
    {
      id: 1,
      name: "Amazon Fire Burgundy Phone Case",
      colour: "Burgundy",
      material: "PVC",
      targetPhone: "Amazon Fire",
      price: 14
    },
    {
      id: 2,
      name: "Nokia Lumia 920/930/Icon Crimson Phone Case",
      colour: "Red",
      material: "Rubber",
      targetPhone: "Nokia Lumia 920/930/Icon",
      price: 10
    }
  ];
};
export default PhoneCaseRepository;
