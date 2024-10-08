import { Mchat } from "@/components/form/mchat/mchat";

type Params = {
  assistidoId: string;
};

type Props = {
  params: Params;
};

const MchatPage = ({ params: { assistidoId } }: Props) => {
  return (
      <Mchat assistidoId={assistidoId} />
  );
};

export default MchatPage;