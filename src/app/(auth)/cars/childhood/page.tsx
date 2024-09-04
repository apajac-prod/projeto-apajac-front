import CarsAdulto from "@/components/form/cars/cars_adulto";
import { CarsChildhoodProvider } from "@/contexts/carsChildhoodContext";

const CarsChildhood = () => {
  return (
    <CarsChildhoodProvider>
      <CarsAdulto />
    </CarsChildhoodProvider>
  );
};
export default CarsChildhood;
