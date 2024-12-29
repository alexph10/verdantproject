import { useState } from 'react';

const initialValues = {
  // Home Details
  homeSize: '',
  occupants: '',
  buildingAge: '',
  
  // Energy Systems
  hvacType: '',
  lightingType: '',
  hasSmartThermo: false,
  
  // Water Systems
  hasLowFlowFixtures: false,
  hasIrrigation: false,
  hasSmartIrrigation: false,
  
  // Appliances
  applianceAges: {
    refrigerator: '',
    washer: '',
    dryer: '',
    dishwasher: '',
  },
};

export function useAuditForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validate required numeric fields
    ['homeSize', 'occupants', 'buildingAge'].forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
      } else if (isNaN(values[field])) {
        newErrors[field] = 'Must be a number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    resetForm,
  };
}