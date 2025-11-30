/**
 * Utility functions for hero section actions
 */

export const scrollToProjects = () => {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
};

export const downloadResume = () => {
  window.open("/api/resume", "_blank");
};
