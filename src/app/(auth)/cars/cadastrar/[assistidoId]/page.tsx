import CarsAdulto from "@/components/form/cars/cars_adulto";
import { CarsChildhoodProvider } from "@/contexts/carsChildhoodContext";

type Params = {
  assistidoId: string;
};

type Props = {
  params: Params;
};

const CarsChildhood = ({ params: { assistidoId } }: Props) => {
  return (
    <CarsChildhoodProvider>
      <CarsAdulto assistidoId={assistidoId} />
    </CarsChildhoodProvider>
  );
};
export default CarsChildhood;
