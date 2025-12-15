import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  isHit: 1 | 0 | null;
  setHit: (isHit: 1 | 0 | null) => void;
};

export default (props: Props) => {
  const switchHit = () => {
    if (props.isHit == null) {
      return props.setHit(1);
    }
    if (props.isHit == 1) {
      return props.setHit(0);
    }
    if (props.isHit == 0) {
      return props.setHit(null);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={switchHit}>
        {props.isHit == null && (
          <Ionicons name="remove-outline" size={40} color="black" />
        )}
        {props.isHit == 1 && (
          <Ionicons name="ellipse-outline" size={40} color="#3e62ad" />
        )}
        {props.isHit == 0 && (
          <Ionicons name="close-outline" size={40} color="#ba2636" />
        )}
      </TouchableOpacity>
    </>
  );
};
