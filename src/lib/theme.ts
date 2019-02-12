import {TextStyle} from 'react-native';

type Theme = {
  text: {
    title: TextStyle;
    subtitle: TextStyle;
  };
  font: {
    roboto: TextStyle;
    openSans: TextStyle;
  };
  color: {
    [k: string]: {
      [k: string]: string;
    };
  };
};

type Colors = {
  primary: string;
  secondary: string;
  greyOne: string;
  greyTwo: string;
  greyThree: string;
  green: string;
  greenLight: string;
  greenLightMuted: string;
  greenMuted: string;
  greenDark: string;
  blueLight: string;
  blueDark: string;
  blueLinkedIn: string;
  red: string;
};

export const colors: Colors = {
  primary: '#52A23E',
  secondary: '#428232',
  greyOne: '#939598',
  greyTwo: '#E5E5E5',
  greyThree: '#F8F8F8',
  green: 'hsl(108,40%,47%)',
  greenLight: 'hsl(108,65%,50%)',
  greenLightMuted: 'hsl(108,5%,90%)',
  greenMuted: 'hsl(108,10%,40%)',
  greenDark: 'hsl(108,10%,10%)',
  blueDark: 'rgb(44, 62, 80)',
  blueLight: 'rgb(52, 152, 219)',
  blueLinkedIn: 'rgb(0,119,181)',
  red: 'rgb(231, 76, 60)'
};

const theme: Theme = {
  text: {
    title: {
      fontSize: 24,
      fontWeight: '600'
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '500'
    }
  },
  font: {
    roboto: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400'
    },
    openSans: {
      fontFamily: 'Open Sans, sans-serif'
    }
  },
  color: {
    primary: {
      color: colors.primary
    },
    secondary: {
      color: colors.secondary
    },
    greyOne: {
      color: colors.greyOne
    },
    green: {
      color: colors.green
    },
    greenMuted: {
      color: colors.greenMuted
    },
    greenDark: {
      color: colors.greenDark
    }
  }
};

export default theme;
