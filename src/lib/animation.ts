export const topDelay: number = 0.5;
export const dashboardDelay: number = 0.25;

export const topProps = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export const dashboardProps = {
  initial: {
    x: 100,
    opacity: 0,
    scale: 0.7,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};