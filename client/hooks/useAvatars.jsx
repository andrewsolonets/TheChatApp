import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

export const useAvatars = () => {
  const api = `https://api.multiavatar.com/4645646`;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAvatars = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      try {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      } catch (err) {
        console.error(err);
      }
    }
    setAvatars(data);
    setIsLoading(false);

    return { avatars, isLoading, data };
  };

  useEffect(() => {
    getAvatars();
  }, []);

  return { avatars, isLoading, getAvatars };
};
