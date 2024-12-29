export const EMISSION_FACTORS = {
  transport: {
    walking: 0,
    cycling: 0,
    bus: 0.089,  // kg CO2e per km
    train: 0.041,
    car: 0.171,
  },
  energy: {
    grid: 0.233,  // kg CO2e per kWh
    solar: 0,
    wind: 0,
    default: 0.233,
  },
  products: {
    electronics: 20,  // kg CO2e per item
    clothing: 10,
    food: 3,
    default: 5,
  },
};