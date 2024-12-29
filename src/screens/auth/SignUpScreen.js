import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/forms/Button';
import { SocialLoginButtons } from '../../components/auth/SocialLoginButtons';
import { Text, Heading } from '../../components/typography';
import { useThemedStyles } from '../../hooks/useTheme';
import { validateEmail, validatePassword } from '../../utils/validation';

export function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
    },
    header: {
      marginBottom: theme.spacing.xl,
    },
    divider: {
      marginVertical: theme.spacing.lg,
    },
  }));

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signUp(formData);
      navigation.navigate('VerifyEmail', { email: formData.email });
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: error.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Heading level={1}>Create Account</Heading>
          <Text variant="bodyLarge" color="textSecondary">
            Join Verdant and start your sustainability journey
          </Text>
        </View>

        <Input
          label="First Name"
          value={formData.firstName}
          onChangeText={value => handleChange('firstName', value)}
          error={errors.firstName}
          autoCapitalize="words"
        />

        <Input
          label="Last Name"
          value={formData.lastName}
          onChangeText={value => handleChange('lastName', value)}
          error={errors.lastName}
          autoCapitalize="words"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={value => handleChange('email', value)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Password"
          value={formData.password}
          onChangeText={value => handleChange('password', value)}
          error={errors.password}
          secureTextEntry
        />

        <Input
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={value => handleChange('confirmPassword', value)}
          error={errors.confirmPassword}
          secureTextEntry
        />

        {errors.submit && (
          <Text variant="caption" color="error">
            {errors.submit}
          </Text>
        )}

        <Button
          title="Sign Up"
          onPress={handleSignUp}
          loading={loading}
          disabled={loading}
        />

        <View style={styles.divider}>
          <Text variant="caption" align="center">
            or continue with
          </Text>
        </View>

        <SocialLoginButtons />

        <Button
          title="Already have an account? Sign In"
          variant="text"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </ScrollView>
  );
}