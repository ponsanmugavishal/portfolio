// Shared motion settings so every animation feels the same.

export const ease = [0.16, 1, 0.3, 1];

export const duration = {
  reveal: 0.7, // scroll-in fade/lift
};

export const stagger = 0.06;

export const spring = { type: "spring", stiffness: 300, damping: 30 };

export const hover = {
  lift: -5, // px, how far interactive glass rises on hover
  press: 0.97, // scale while pressed
};

// Only vertical margins, so side-animated items never cause horizontal scroll.
export const viewport = { once: true, margin: "-80px 0px" };
