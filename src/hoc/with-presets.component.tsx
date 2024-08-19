import { ElementType } from "react";
import { useGetListingPresets } from "../components/listing-info/listing-info.hooks";

const WithPresets = (WrappedComponent: ElementType) => {
  const presets = useGetListingPresets();

  return (
    <WrappedComponent presets={presets} />
  )
};

export default WithPresets;
