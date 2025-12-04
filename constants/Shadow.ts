export const Shadow = {
  soft: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  }),
};
