import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthForm } from '../../components/auth/AuthForm';
import { signIn, signUp } from '../../services/auth/authService';
import { theme } from '../../theme';

export function AuthScreen() {
  const [mode, setMode] = useState('signIn');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setMode(mode === 'signIn' ? 'signUp' : 'signIn');
  };

  const handleSubmit = async (credentials) => {
    try {
      setLoading(true);
      if (mode === 'signIn') {
        await signIn(credentials);
      } else {
        await signUp(credentials);
      }
    } catch (error) {
      console.error('Auth error:', error);
      // Handle error (show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        loading={loading}
      />
      
      <Button
        mode="text"
        onPress={toggleMode}
        style={styles.toggleButton}
      >
        {mode === 'signIn' ? 'Create an account' : 'Already have an account?'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  toggleButton: {
    marginTop: theme.spacing.lg,
  },
});