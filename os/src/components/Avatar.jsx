import { useState } from "react";
import clsx from "clsx";
import { profile } from "#constants";

// My photo, falling back to initials if the image can't load.
const Avatar = ({ className, size = 96 }) => {
  const [failed, setFailed] = useState(false);
  return (
    <span className={clsx(className, "has-photo")} aria-hidden="true">
      {failed ? (
        profile.initials
      ) : (
        <img
          src={profile.avatar}
          alt=""
          width={size}
          height={size}
          decoding="async"
          draggable="false"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
};

export default Avatar;
