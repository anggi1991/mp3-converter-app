declare module "i18n-js" {
  const I18n: {
    t: (key: string, options?: any) => string;
    locale: string;
    translations: object;
    fallbacks: boolean;
    defaultLocale: string;
    currentLocale: () => string;
  };
  export default I18n;
  export const t: (key: string, options?: any) => string;
}
