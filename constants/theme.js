// theme.js

export const lightColors = {
    primary: '#ff6b00',
    primaryLight: 'rgba(255,107,0,0.2)',
  
    button: {
      primary: {
        gradient: {
          start: '#ff6b00',
          end: '#000000',
        },
        text: '#ffffff',
      },
      secondary: {
        gradient: {
          start: '#2a2a2a',
          end: '#000000',
        },
        text: '#ffffff',
      },
      danger: {
        gradient: {
          start: '#ff4444',
          end: '#cc0000',
        },
        text: '#ffffff',
      },
      disabled: {
        gradient: {
          start: '#cccccc',
          end: '#999999',
        },
        text: '#666666',
      },
    },
  
    background: '#f5f5f5',
    surface: '#ffffff',
    surfaceAccent: '#f0f0f0',
  
    text: '#1a1a1a',
    textSecondary: '#666666',
    textDanger: '#ff6b00',
  
    border: '#e0e0e0',
    toggle: '#e0e0e0',
    toggleActive: '#ff6b00',
  
    icon: {
      active: '#ff6b00',
      inactive: '#666666',
    },
  };
  
  export const darkColors = {
    primary: '#ff6b00',
    primaryLight: 'rgba(255,107,0,0.2)',
  
    button: {
      primary: {
        gradient: {
          start: '#ff6b00',
          end: '#000000',
        },
        text: '#ffffff',
      },
      secondary: {
        gradient: {
          start: '#2a2a2a',
          end: '#000000',
        },
        text: '#ffffff',
      },
      danger: {
        gradient: {
          start: '#ff4444',
          end: '#cc0000',
        },
        text: '#ffffff',
      },
      disabled: {
        gradient: {
          start: '#333333',
          end: '#1a1a1a',
        },
        text: '#666666',
      },
    },
  
    background: '#1a1a1a',
    surface: '#2a2a2a',
    surfaceAccent: '#333333',
  
    text: '#ffffff',
    textSecondary: '#888888',
    textDanger: '#ff6b00',
  
    border: '#333333',
    toggle: '#333333',
    toggleActive: '#ff6b00',
  
    icon: {
      active: '#ff6b00',
      inactive: '#888888',
    },
  };
  
  export const theme = {
    light: lightColors,
    dark: darkColors,
  };
  