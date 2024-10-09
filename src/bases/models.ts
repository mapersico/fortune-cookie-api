export interface HoroscopeResponse {
  data: {
    date: string;
    horoscope_data: string;
  };
  status: number;
  success: boolean;
}

export enum HoroscopeSigns {
  "aries" = "Aries",
  "tauro" = "Taurus",
  "geminis" = "Gemini",
  "cancer" = "Cancer",
  "leo" = "Leo",
  "virgo" = "Virgo",
  "libra" = "Libra",
  "escorpio" = "Scorpio",
  "sagitario" = "Sagittarius",
  "capricornio" = "Capricorn",
  "acuario" = "Aquarius",
  "piscis" = "Pisces",
}
