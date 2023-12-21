import anime from "animejs";

export const loginAnimation = () => {
  let currentAnimation = null;

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const submitButton = document.querySelector("#submit");

  const handleFocus = (target, offsetValue, dashArrayValue) => {
    if (currentAnimation) currentAnimation.pause();

    currentAnimation = anime({
      targets: "path",
      strokeDashoffset: {
        value: offsetValue,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: dashArrayValue,
        duration: 700,
        easing: "easeOutQuart",
      },
    });
  };

  emailInput.addEventListener("focus", () => {
    handleFocus("path", 0, "240 1386");
  });

  passwordInput.addEventListener("focus", () => {
    handleFocus("path", -336, "240 1386");
  });

  submitButton.addEventListener("focus", () => {
    handleFocus("path", -730, "530 1386");
  });

  // Cleanup event listeners when the component unmounts
  return () => {
    emailInput.removeEventListener("focus", handleFocus);
    passwordInput.removeEventListener("focus", handleFocus);
    submitButton.removeEventListener("focus", handleFocus);
  };
};
