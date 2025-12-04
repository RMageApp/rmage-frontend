import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}

export const Button = ({ title, onPress, variant = 'primary' }: ButtonProps) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[styles.container, isPrimary ? styles.primary : styles.outline]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textOutline]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent', // Default border
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outline: {
    backgroundColor: '#fff5f5ff', // Subtle red tint
    borderColor: colors.primary,
    borderWidth: 2,
    elevation: 5,
    shadowColor: colors.primary, // Red shadow/glow
    shadowOffset: { width: 0, height: 4 }, // Deeper shadow
    shadowOpacity: 0.3, // More visible
    shadowRadius: 8, // Softer blur
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: colors.primary,
  },
});