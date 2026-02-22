// "use client";
// import React, { useState } from "react";
// import Detail from "./detail/Detail";
// import Catalog from "../catalog/catalog_card/Catalog";
// import Catalog_card from "../catalog/catalog_card/Catalog_card";

// const DetailPage = () => {
//   const [selectedMarka, setSelectedMarka] = useState<string | null>(null);
//   const [selectedModel, setSelectedModel] = useState<string | null>(null);
//   const [selectedKuzov, setSelectedKuzov] = useState<string | null>(null);
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

//   return (
//     <div>
//       <Catalog
//         filters={{ selectedMarka, selectedModel, selectedKuzov, selectedTypes }}
//         setFilters={{
//           setSelectedMarka,
//           setSelectedModel,
//           setSelectedKuzov,
//           setSelectedTypes,
//         }}
//       />
//       <Detail />
//       <Catalog_card
//         filters={{ selectedMarka, selectedModel, selectedKuzov, selectedTypes }}
//       />
//     </div>
//   );
// };

// export default DetailPage;

"use client";

import React, { useState } from "react";
import Detail from "./detail/Detail";
import Catalog from "../catalog/catalog_card/Catalog";
import Catalog_card from "../catalog/catalog_card/Catalog_card";

const DetailPage = () => {
  const [selectedMarka, setSelectedMarka] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedKuzov, setSelectedKuzov] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <div>
      <Catalog
        isDetailPage={true}
        filters={{
          selectedMarka,
          selectedModel,
          selectedKuzov,
          selectedTypes,
        }}
        setFilters={{
          setSelectedMarka,
          setSelectedModel,
          setSelectedKuzov,
          setSelectedTypes,
        }}
      />

      <Detail />
      <Catalog_card
        filters={{ selectedMarka, selectedModel, selectedKuzov, selectedTypes }}
      />
    </div>
  );
};

export default DetailPage;
