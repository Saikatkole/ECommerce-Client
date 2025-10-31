// src/components/PaymentDropIn.js
import { useEffect, useRef } from "react";
import dropin from "braintree-web-drop-in";

const PaymentDropIn = ({ clientToken, onInstance }) => {
  const dropinRef = useRef(null);

  useEffect(() => {
    if (!clientToken) return;

    // Clear any previous dropin UI before re-initializing
    if (dropinRef.current) dropinRef.current.innerHTML = "";

    dropin.create(
      {
        authorization: clientToken,
        container: "#braintree-dropin-container",
        paypal: { flow: "vault" },
      },
      (error, instance) => {
        if (error) {
          console.error("DropIn creation error:", error);
        } else {
          console.log("✅ DropIn instance created:", instance);
          onInstance(instance);
        }
      }
    );

    return () => {
      if (dropinRef.current) dropinRef.current.innerHTML = "";
    };
  }, [clientToken]);

  return <div id="braintree-dropin-container" ref={dropinRef}></div>;
};

export default PaymentDropIn;
