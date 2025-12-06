import { useState } from "react";

export const Wrapper = ({ children }) => {
    const [ischecked, setischeked] = useState(false);

  return (
    <div>
      <label>
        {ischecked ? "Hide" : "Show"}
        <input
        type="checkbox"
        checked={ischecked}
        onChange={() => setischeked(!ischecked)}
      />
      </label>
        <div>
            {ischecked && <>{children}</>}
    </div>
    </div>
  );
};
