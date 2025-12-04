export const Colors = {
  dark: {
    background: "#0F172A", // Deep Indigo/Slate
    surface: "#1E293B",
    primary: "#6366F1", // Indigo 500
    secondary: "#06B6D4", // Cyan 500
    accent: "#8B5CF6", // Violet 500
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
    border: "rgba(255, 255, 255, 0.1)",
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },
  gradients: {
    primary: ["#6366F1", "#06B6D4"] as const, // Indigo to Cyan
    glass: ["rgba(30, 41, 59, 0.7)", "rgba(15, 23, 42, 0.6)"] as const,
    card: ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.02)"] as const,
  },
  glass: {
    background: "rgba(30, 41, 59, 0.7)",
    border: "rgba(255, 255, 255, 0.1)",
    blur: 10,
  },
};
