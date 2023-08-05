const dateParser = (content: string): string[] => {
  // Implement date parsing logic here and return an array of dates
//   In this updated version, the regular expression captures three different date formats:

// "DD/MM/YYYY" or "DD-MM-YYYY" or "DD.MM.YYYY" (e.g., 01/08/2023 or 01-08-2023 or 01.08.2023)
// "DD/MM/YY" or "DD-MM-YY" or "DD.MM.YY" (e.g., 01/08/23 or 01-08-23 or 01.08.23)
// "YYYY/MM/DD" or "YYYY-MM-DD" or "YYYY.MM.DD" (e.g., 2023/08/01 or 2023-08-01 or 2023.08.01)

  const regex = /(\d{1,2}[./-]\d{1,2}[./-]\d{4}|\d{1,2}[./-]\d{1,2}[./-]\d{2}|\d{4}[./-]\d{1,2}[./-]\d{1,2})/g;
  const matches = content.match(regex);

  return matches || [];
};

export default dateParser;