import React from "react";

export const useChatScroll = (dep) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
};
