const { getCabins } = require("../_lib/data-service");
import CabinCard from "./CabinCard";
import { unstable_noStore as no_store } from "next/cache";

async function CabinList() {
  //   no_store();
  const cabins = await getCabins();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
