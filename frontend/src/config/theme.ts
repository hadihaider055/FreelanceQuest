export interface PrimaryTheme {
  breakpoints: {
    mobile: number;
    ipad: number;
    ipadpro: number;
    desktop: number;
    xl: number;
    xlDesktop: number;
  };
}

export const primaryTheme: PrimaryTheme = {
  breakpoints: {
    mobile: 425,
    ipad: 768,
    ipadpro: 1024,
    desktop: 1440,
    xlDesktop: 1512,
    xl: 1900,
  },
};
