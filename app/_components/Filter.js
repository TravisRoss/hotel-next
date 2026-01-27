"use client";

import { useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get("capacity") || "all";

  function handleFilterClick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button onClick={() => handleFilterClick("all")}>All</Button>
      <Button onClick={() => handleFilterClick("small")}>Small</Button>
      <Button onClick={() => handleFilterClick("medium")}>Medium</Button>
      <Button onClick={() => handleFilterClick("large")}>Large</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="px-5 py-2 hover:bg-primary-700" onClick={onClick}>
      {children}
    </button>
  );
}

export default Filter;
className = "border border-primary-800 flex";
