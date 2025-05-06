import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  isHit: boolean | null;
  setHit: (isHit: boolean | null) => void;
};

export default (props: Props) => {
  const switchHit = () => {
    if (props.isHit == null) {
      return props.setHit(true);
    }
    if (props.isHit == true) {
      return props.setHit(false);
    }
    if (props.isHit == false) {
      return props.setHit(null);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={switchHit}>
        {props.isHit == null && (
          <Ionicons name="remove-outline" size={40} color="black" />
        )}
        {props.isHit == true && (
          <Ionicons name="ellipse-outline" size={40} color="#3e62ad" />
        )}
        {props.isHit == false && (
          <Ionicons name="close-outline" size={40} color="#ba2636" />
        )}
      </TouchableOpacity>
    </>
  );
};
