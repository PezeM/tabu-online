import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

export const TestSocket = () => {
  const [socket, setSocket] = useState<undefined>(
    undefined
  );

  useEffect(() => {

  }, []);

  const chuj = () => {
  };

  return (
    <div>
      <Button onClick={() => chuj()}>Kliknij</Button>
    </div>
  );
};
