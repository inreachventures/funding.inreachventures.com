import {TextStyle} from 'react-native';

type Theme = {
  text: {
    title: TextStyle;
    subtitle: TextStyle;
  };
  color: {
    [k: string]: {
      [k: string]: string;
    };
  };
};

type Colors = {
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
  color: {
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
