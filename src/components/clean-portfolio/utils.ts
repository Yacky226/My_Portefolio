export const asArray = <T,>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

export const asString = (value: unknown, fallback = ""): string => {
  return typeof value === "string" ? value : fallback;
};

export const formatDate = (date: Date, language: string) => {
  const locale = language === "fr" ? "fr-FR" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};
